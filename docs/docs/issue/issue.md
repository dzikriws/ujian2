---
sidebar_position: 1
---

# Issues

## Issue and Future Enhancement
There are some issues and future enhancement that we want to add to the task.

### Security
When user login, there is still no authorization like jwt or cookies, still used sessionStorage to store user data.

### Performance
In frontend project file : 
- there are many components that can be optimized. example : in add and update modal in component there are many state and logic that can be optimized.
- there are little bugs that can be fixed such as select rows per page and pagination in commons component when change page.

Meanwhile, in backend project file :
- there are many can be optimized server such as using indexing when filtering transaction report.
- adding rate limiter for api request to handling too many request.
- chalk libraries when used to loging with morgan is deprecated with typescript commonJS project type.