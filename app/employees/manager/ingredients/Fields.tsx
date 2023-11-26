import { Paper } from "@mui/material";
import { ingredients } from "@prisma/client";
import React, { FormEvent, useState } from "react";

interface FieldsProps {
    selectedDrink: ingredients | undefined,
}

