import errorHandler from "./middlewares/errors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from 'helmet';
import cors from "cors"
import path from "path";
import authRoutes from "./modules/auth/auth.router"
import userRoutes from "./modules/user/user.router"
import categoryRoutes from "./modules/category/category.router"
import productRoutes from "./modules/product/product.router"
import commentRoutes from "./modules/comment/comment.router"
import contactRoutes from "./modules/contact/contact.router"
import articleRoutes from "./modules/article/article.router"
import ticketRoutes from "./modules/ticket/ticket.router"
import searchRoutes from "./modules/search/search.router"
import offRoutes from "./modules/off/off.router"
import menuRoutes from "./modules/menu/menu.router"
import wishlistRoutes from "./modules/wishlist/wishlist.router"
import orderRoutes from "./modules/order/order.router"
import infoRoutes from "./modules/info/info.router"


const app = express();

// BodyParser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

// CookieParser
app.use(cookieParser());

//  cors package
app.use(cors())

// Use Helmet
app.use(helmet());

// Static Folder
app.use('/public', express.static(path.join(__dirname, '../public')));

// Routes

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Store Api" })
})

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/comment", commentRoutes);
app.use("/contact", contactRoutes);
app.use("/article", articleRoutes);
app.use("/search", searchRoutes);
app.use("/ticket", ticketRoutes);
app.use("/off", offRoutes);
app.use("/order", orderRoutes);
app.use("/menu", menuRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/info", infoRoutes);





//* Error Controller
app.use((req, res) => {
    console.log("this path is not available:", req.path);
    res.status(401).json({ message: "401 OOPS! PATH NOT FOUND" });
});
app.use(errorHandler);



export { app }