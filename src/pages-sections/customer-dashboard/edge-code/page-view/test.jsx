"use client";
import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import CodeIcon from "@mui/icons-material/Code";
import Code from "../code";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import { generateRefers } from "utils/__api__/refers";
import Button from "@mui/material/Button";
import generate__edge__code from "lib/generate-edge-code";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { OrderCom } from "components/orderCom";
import { ShareCom } from "components/shareCom";

// ============================================================
const TestPageView = async ({ href, authToken }) => {
  const router = useRouter();
    router.push(`/${href}/${authToken}`)
};

export default TestPageView;
