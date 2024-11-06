# Technical alignment

## Typical ways on how queues are handled:

- A central queue or a queue per microservice
- The microservice either polls the queue or there is an event-driven system (pub/sub)
- lightweight solution with low overhead or a fully featured system (Rabbit MQ)

### How to align the department and move on?

This calls for creating an RFC and using that to find alignment.
In more detail:
Gather the different opinions and make sure you have a good understanding on why the person(s) prefer that particular solution.
This will give you a set of solutions and or technologies. Those different solution can now be written in the RFC, after a brief introduction, background and the goal(s) of this RFC. We want this in writing so we have a common and shared understanding of the solutions. This should also contain some advantages and drawbacks for each solution.
Given that we now have those solutions we can evaluate each of them. Potentially a whiteboard evaluation with some tech documents/docs lookup can get us to a good understanding. We might have to test the solutions/technologies hands on with a simple PoC.
The results of this evaluation should again be written down.
Ideally after the evaluation there is a solution that is superior over the others. If not we have to call for a discussion meeting.
Ones a proposed solution is found it's written down.
Now the RFC is ready for comments of the Engineering department.
If there are no critical comments/issues with the solution we now have alignment and can discuss a action plan to execute.
