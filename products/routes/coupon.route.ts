import {Router } from 'express';
import { handleAddCoupon } from '../controller/coupon.controller';

const couponRoute = Router();

couponRoute.post('/', handleAddCoupon)

export default couponRoute