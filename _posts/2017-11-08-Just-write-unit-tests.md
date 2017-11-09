---
layout: post
title: I don't need unit tests...
categories: blog
---

I'm a Javascript developer if you didn't know, and I'm going to admit it right now. I don't always write my tests first :scream:. Personally, I think this is O.K. It's probably more of a case that I haven't taken the time to retrain my brain to write tests first, but generally when I am in a good flow, I forget to write tests (which probably means that I am in fact _not_ in a good flow, but :shrug:). However, I _do_ write tests, and I _do_ sometimes write my tests first. Naively I thought writing unit tests was a _fait accompli_; apparently not, there are still some of you out there who are just too awesome to write tests. Your code is bullet proof and the only way it could break is if it's a) used wrong or b) the requirements were wrong. Wait a min... let's think about that for a sec. My code could be used wrong? or maybe I misunderstood the requirements :thinking_face:. Worse yet, maybe the BA / PM / none techy who wrote the requirements didn't consider their effect, or didn't consider some edge case. Well, that's their problem right? There's no way I can protect against idiots!

WRONG. You're a developer, you've been doing this for years, you've seen it all. Other devs trying to use your code in a way it wasn't intended, the ticket your working on missing a bunch of detail and edge cases, acceptance criteria, even a bloody description would be nice!!!

Enter, the Unit Test :sun_rays:

Let's take a minute to summarise where we are up to: 

- BA's are rubbish and can't write tickets in sufficient detail. 
- Your code rocks based on the detail in the ticket you're working on. 
- Other devs are rubbish because they used your code wrong. 

Firstly I'm sure the irony isn't lost on you that if you feel like the work you are being asked to do hasn't been described in sufficient detail, you also need to describe your implementation in sufficient detail for the next dev who comes along. This is where unit tests can help, unit tests are not a substitute for documentation, but given no documentation, they make for a good substitute. This is because after reading a bunch of unit tests, a developer can see what the code is _intended_ to do and where the boundaries of responsibility are. 

So imagine this, imaging that you have a BA who writes a bunch of really detailed acceptance criteria and a clear definition of done for your ticket. Awesome! You can now happily code it up to do exactly the thing they want it to do. 

Now imagine that it's 6 months on and another developer is wanting to make some changes to the function you wrote; but you have some other functions that depend on the current implementation. Uh oh, developer 2 has no idea _what_ developer 1 was actually trying to achieve other than do some stuff to a thing. So he either gives up and makes a WET decision, or he just undergoes trial and error until everything _appears_ to be working. Oh well, sucks to be him right? Unless... I'm him!!! Then developer 1 is a dick for doing such a crummy job. Had he of coded it better it wouldn't be a problem.

I think you can see my point. In the same way that you, the developer, wants clarity of requirements for a BA type person, you should also give sufficient clarity on what you intend your code to do. The benefit of defining this in unit tests is that if anyone changes what you originally intended your code to do, they get a friendly **FAIL** reminder. Now doesn't that make sense. 

Ok; let's address the your code rocks point. If you are anything like me your code is super readable, it does exactly what is says on the tin and is bullet proof ;) (I promise you this is highly unlikely but absolutely possible). Ignoring that your beliefs are from your frame of reference (i.e what you find bullet proof and readable now, you may have no idea what it does later on down the line), how do you _know_ that your code is as good as it can be? Because the app doesn't crash during runtime / compilation? Sweet, I mean if it did bork this would be the worst time to find out. How about Because it can handle all of the edge cases you can think of... how would you know this? Unit tests give you the ability to _prove_ that your code is bullet proof, in a safe sandboxed environment you can throw all sorts at it, pass it invalid params, mock side effects, handle invalid async; and look at it, your code truly does rock! And you know why, because you can prove it with some sweet unit tests. 

So, why aren't you writing them already? 

Probably because yes, you get why they're useful (you're not stupid right?!), but timelines are already tight and you just don't have the time to write something that doesn't get executed at runtime. Well how about you bake testing into your estimates? Your velocity won't change and you'll get far fewer support calls because, _your code rocks_. Also you're app will be more stable, you've thrown every edge case you can think of at your code, those pesky users can add SQL into that form, they can pop a image into that date field, it's all taken care of and you _know_ it works. So what were you saying about now having the time? Do you not have the time to chill with your feet up basking in the glory of your rocking code and your total lack of app support hassle? I certainly have loads of time for that :)

:wq
