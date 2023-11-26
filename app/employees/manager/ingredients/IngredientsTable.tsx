'use client'

import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from "@mui/material";
import { ingredients } from "@prisma/client";
import React from "react";

interface IngredientProps {
    ingredients: { id: number; name: string | null; quantity: number | null; unit_price: string | null; min_quantity: number | null;}[],
    changeIngredient(newIngredient: ingredients): void
}