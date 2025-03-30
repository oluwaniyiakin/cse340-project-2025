const pool = require("../database"); // PostgreSQL database connection

/* ****************************************
 *  Build the site navigation dynamically
 * **************************************** */
async function getNav() {
    try {
        const result = await pool.query("SELECT classification_id, classification_name FROM classification ORDER BY classification_name");
        const classifications = result.rows;

        let nav = `<ul>`;
        nav += `<li><a href="/" title="Home">Home</a></li>`;

        classifications.forEach(classification => {
            nav += `<li><a href="/inventory/${classification.classification_id}" title="${classification.classification_name}">${classification.classification_name}</a></li>`;
        });

        nav += `</ul>`;
        return nav;
    } catch (error) {
        console.error("Error generating navigation:", error);
        throw error;
    }
}

/* ****************************************
 *  Middleware to handle flash messages
 * **************************************** */
function flashMessages(req, res, next) {
    if (req.session.flashMessage) {
        res.locals.flashMessage = req.session.flashMessage;
        delete req.session.flashMessage;
    }
    next();
}

/* ****************************************
 *  Middleware to handle errors gracefully
 * **************************************** */
function errorHandler(err, req, res, next) {
    console.error("Server Error:", err);
    res.status(500).render("errors/500", { title: "Server Error", message: "Something went wrong. Please try again later." });
}

/* ****************************************
 *  Middleware for checking authentication
 * **************************************** */
function checkAuth(req, res, next) {
    if (!req.session.user) {
        req.session.flashMessage = "You must be logged in to access this page.";
        return res.redirect("/account/login");
    }
    next();
}

module.exports = {
    getNav,
    flashMessages,
    errorHandler,
    checkAuth
};

