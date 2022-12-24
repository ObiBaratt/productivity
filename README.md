# Goals

Todo apps are a staple for a reason, there's a bunch of fundamental concepts needed to make one that works like you'd expect. I'm intending to make this a fun, modular project that has room to grow into a general productivity site with TODO, Kanban, and whatever else I think of handled under one auth scheme. Eventually the goal is to integrate everything into a user friendly all purpose tool and iterate on what people gain value from.

# Design Decisions

### Next.js

- A lot of this is a learning decision, when I started this project I also had a major Django project going. I also feel like Next APIs, a DB, and some cloud functionality will be more than enough to handle this app.
- Lots of stuff I would want anyways built in (probably more optimized than I'd manage to piece it together).

### SQL / NoSQL

- Leaning towards NoSQL due to the data being used in different ways across apps. Big benefit is being able to easily change data shapes.
- Leaning slightly more towards SQL for the same reason... it would enforce consistancy. Currently the only relationship would be from User to Task.

### Modular Apps

- Each app will communicate with a shared DB, but they don't need to communicate with each other.
- This should make it more customizable with conditional rendering of apps.
- Would also be a step towards allowing them to be embedded elsewhere.

# Thoughts

What makes something actually boost productivity? What is essential to making this a net positive for users? In my view this app should:

- Make things easier not more complex
- Be intuitive. Drag and drop, Buttons do what you expect them to (big criticism of my Kanban Navbar).
- Be satisfying to use. It doesn't matter how useful a productivity tool is if the UI/UX is terrible.
- Parts should interact like you'd expect them to. A TODO for the 27th should appear on my calendar, if added to Kanban should change color or display some indication that its urgent.

# Status

## In Progress (MVP Stuff)

- Finish basic landing page
- Add code to componets to make the basic display work (use dummy data)
  - Live site with info saved to local storage at this point.
- Setup db to start using real data
- Add Auth to handle multiple users
  - Update live site to be a full fledged app

## For Sures

- Integrate this with my Kanban App to make a productivity site
  - Have "Add to Kanban" button on Tasks (Use leftside Kanban pic)
- Add Pomodoro, I have an old Python version... could be interesting trying to integrate that, or just recreate the functionality in React (much easier but less interesting)
- Testing input/outputs and integrations. I don't want to add a super cool new feature to the Kanban side and somehow break everything else.
  - TDD is too heavy at this point, but will be implemented for bugfixing.
- Generate an agenda for the day. Either request timeslots be filled, or have configurable settings to
- Email automation for reminders.

## Maybes

- Team integrations? What's better than making a TODO list for yourself? Assigning it to someone else!
  - Adding Org Users or Management Users to make it more of a business tool
  - Multiplayer using y.js
- Calendar integrations...
  - Tricky, I'm not envisioning this being a calendar, but reading tasks from a linked calendar and creating a daily todo list / agenda would be useful.
- Dark mode / whole app color customizations context
  - Probably smart to start coding like I will eventually do this instead of refactoring
- Site layout customizaitons. Move individual apps around.
  - Kinda sounds like a buggy nightmare...
  - Drag and Drop could be very promising for this.
- Check out if analytics can be routed back to the user, or create some way of displaying productivity data
