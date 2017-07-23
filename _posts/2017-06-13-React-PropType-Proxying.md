---
layout: post
title: React Props Proxying
categories: blog
---

In large React/Redux projects you can end up having to define **huge** proxy lists for deeply nested components that rely on container props. 

Exmaple, in your container you may be passing tens of props down:

```javascript
 return {
   prop1,
   prop2,
   prop3,
   prop4,
   prop5,
   prop6,
 }
```

Which are then picked up by the next component in the tree and passed down to some of it's children:

```javascript
    render(){
        let {
          prop1,
          prop2,
          prop3,
          prop4,
          prop5,
          prop6
         } = this.props;

        const fooProp1 = `foo${prop1}`

        return(
        	<MyComponent
                prop1={fooProp1}
                prop2={prop2}
                prop3={prop3}
                prop4={prop4}
                prop5={prop5}
                prop6={prop6}
		/>
       )
    }
```

I have now repeated the same props 3 times just to pass them through to a child component, which might not even be using them, and that's not including the repeating PropTypes for each component that's proxying the props through. This feels pretty WET to me and with our 100+ prop lists was getting unmaintainable. So our solution was to use the final destinations PropTypes to filter all of the props coming in.

Let's see what that will look like:

```javascript
    render(){
	const proxyProps = this.props;
        let {
          prop1,
       } = proxyProps;

	const fooProp1 = `foo${prop1}`

	return(
		<MyComponent
			{...mapPropTypesToProps(proxyProps, MyComponent.propTypes)}
			prop1={fooProp1}
		/>
	)
    }
```

So here, we can grab out the prop we want to mutate, and all the rest are passed to `mapPropTyesToProps`. What this does is extract the child component propTypes from the proxyProps object.

Here’s the basic unit test:

```javascript
import React from 'react';
import mapPropTypesToProps from './mapPropTypesToProps';

it('should map props to an object literal based off proptypes', () => {
  expect(mapPropTypesToProps(
    {
      foo: 'bar',
      baz: 1
    },{
      foo: React.PropTypes.string,
      baz: React.PropTypes.number
    }
  )).toEqual( {
    foo: 'bar',
    baz: 1
  });
});

it('should omit props that aren\'t in proptypes', () => {
  expect(mapPropTypesToProps(
    {
      foo: 'bar',
      baz: 1
    },{
      foo: React.PropTypes.string,
    }
  )).toEqual({
      foo: 'bar'
  });
});
```

And here’s the little lib:

```javascript
export default function(proxyProps, propTypes){
  return Object.keys(proxyProps).reduce((proxyObject, prop) => {
    if(!propTypes[prop]) return proxyObject;
    proxyObject[prop] = proxyProps[prop];
    return proxyObject;
  }, {});
}
```

As you can see all I’m doing here is reducing the list of parent props down by the child PropTypes, so I can just pass all the props into here, and have the confidence that only the defined PropTypes will be passed down. 

This also has the advantage of ensuring you keep your PropTypes up-to-date. 
