// create reusable function access_control
export default function access_control(allowedRoles) {
  return function (request, response, next) {
    if (request.session.user != null) {
      if (allowedRoles.includes(request.session.user.user_role)) {
        next();
      } else {
        response.render("status.ejs", {
          status: "Access Denied",
          message: "Invalid access role",
        });
      }
    } else {
      response.render("status.ejs", {
        status: "Access Denied",
        message: "Not logged in",
      });
    }; 
  };
}; 
