# Grafin

## Purpose
A reusable library of commonly used visual charts to be used across multiple projects with an intuitive API.

## Options
1. Use / Extend / fork a prebuilt library
2. Brew our own library

## 1. Use a prebuilt library
There are multiple libraries out there that do what we would want, the challenge would be to find one that is kept up to date, supports multiple chart types and can be visually and interactively customised.

If we were to fork the library the codebase would have to be in at least a decent state and hopefully well documented. The general methodology should be transparent and available to make sure that we will not land up conflicting on our contributions.

### gRaphael
* \- Generally looks quite shoddy.
* \- Doesn't support a vast amount of charts.
* \- Is generally neglected by it's community

### NVD3
* \+ Visually great
* \+ Extension of D3, which is commonly used
* \+ Is kept relatively up to date
* \+ Supports many chart types
* \- although contributions have recently slowed down 
* \- [Has been made closed sourced in the past](https://news.ycombinator.com/item?id=4807126), [although they promise not to do it again](http://nvd3.org/statement.html)
* \- [API isn't intuitive](http://nvd3.org/livecode/#codemirrorNav)
* \- [Documentation is poor](http://nvd3.org/livecode/#codemirrorNav)
* \- [Performance can be sluggish](https://news.ycombinator.com/item?id=4797668) [when using multiple charts and interactions](https://news.ycombinator.com/item?id=4161094)

## 2. Brew our own library
There will be multiple challenges when deciding to brew our own library. Parts of a graphing / charting library would include:

* Visual drawing (SVG / HTML)
* Data processing
* Interaction

In our choice to write our own, we might want to look at using a supporting library, e.g. D3, Raphael. 

## Decision 
We have chosen to go down the path of starting from a clean slate and writing our own charting library.

It is important to state that this is a *charting* library as we are not choosing to write our own data / drawing library. We will be building upon D3. 

The reason for this would be that D3 already has great data formatting modules called [layouts](https://github.com/mbostock/d3/wiki/Layouts). We will be creating the charts on these, creating custom layouts when they're required.

D3 also has had the most commonly used [charts created already](http://bl.ocks.org/) and [not so commonly used](http://bl.ocks.org/mbostock/1353700), leaving it up to us to just copy and paste the code, with little effort being put into making the chart customisable.

D3 is also very widely used, so if we get this library into a good state, with a intuitive API, I would suspect that there might be a lot of people looking to use it, which might land us in a position with people contributing outside of AdaptiveLab.