'use client'
import React from "react";
import './page.css';
import { usePathname, useParams } from 'next/navigation'
import { use } from 'react'

import VisualCard from "@/components/visual_card/visual_card";
import SelectedMixCard from "@/components/selected_mix_card/SelectedMixCard";
//
// Mix Title
// Creator Name
// Upload Date
// Description
//
// Recommended
//
//
export default function Selected_Mix() {
	const pathname = usePathname()
	const params = useParams()
	return (
		<main>
			<SelectedMixCard></SelectedMixCard>
		</main >
	)
};
