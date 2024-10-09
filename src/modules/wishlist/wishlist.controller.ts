import { Request, Response, NextFunction } from "express";
import { categoryModel } from "../../models/Category";
import wishListModel from "../../models/Wishlist";
import { AuthenticatedRequest } from "../../interfaces/auth";


const add = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

        const user = req.user?._id
        const { product } = req.body;

        await wishListModel.addToWishlistValidation({ ...req.body, user }).catch((err) => {
            err.statusCode = 400;
            throw err;
        });

        const isProductExist = await wishListModel.findOne({ user, product }).lean()

        if (isProductExist) {
            res.status(409).json({ message: "this product exist in this user wishlist" });
            return
        }

        const newWishListProduct = await wishListModel.create({ user, product });

        res.status(201).json(newWishListProduct);
        return
    } catch (error) {
        next(error);
    }
};

const getAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

        const userWishlist = await wishListModel.find({ user: req.user?._id }).lean();

        if (!userWishlist.length) {
            res
                .status(404)
                .json({ message: "There are no item in wishlist" });
            return
        }
        res.json(userWishlist);
        return
    } catch (error) {
        next(error);
    }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id
        

        await wishListModel.removeFromWishlistValidation({ id }).catch((err) => {
            err.statusCode = 400;
            throw err;
        });
        const deletedProduct = await wishListModel.findOneAndDelete({
            _id: id,
        });
        if (!deletedProduct) {
            res.status(404).json({ message: "product Not Found!" });
            return
        }
        res.json({ message: "product removed successfully" });
        return
    } catch (error) {
        next(error);
    }
};


export {
    add,
    getAll,
    remove,
}
