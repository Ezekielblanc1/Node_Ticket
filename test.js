// const TicketSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//     },
//     message: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Tickets = require("../models/tickets");
// exports.createTicket = function (req, res, next) {
//   const name = req.body.name;
//   const email = req.body.email;
//   const message = req.body.message;
//   if (!name) {
//     return res.status(422).send({
//       error: "You must enter a name!",
//     });
//   }
//   if (!email) {
//     return res.status(422).send({
//       error: "You must enter your email!",
//     });
//   }
//   if (!message) {
//     return res.status(422).send({
//       error: "You must enter a detailed description of what you need!",
//     });
//   }
//   let ticket = new Tickets({
//     name: name,
//     email: email,
//     status: "Open",
//     message: message,
//   });
//   ticket.save(function (err, user) {
//     if (err) {
//       return next(err);
//     }
//     res.status(201).json({
//       message: "Thanks! Your request was submitted successfuly!",
//     });
//     next();
//   });
// };




// //Mentor and train interns in front end develpment
// //Implemented various websites and landing pages from concept through development