import React, { ReactElement } from "react";
import {ContentCreatorDiv} from "@/component/common/common-styles";
import { Hero } from "../common/hero";
import FaceImage from "@/assets/images/face.png"
import { ItemsColections } from "../common/items-colections";
import { CreatorChip } from "../common/creator-chip";
import BratyFootGril from "@/assets/images/teste/avatar_md_5147.jpg"
import BratyPrincess from "@/assets/images/teste/avatar_md_4299.jpg"
import Borderland from "@/assets/images/teste/avatar_md_687.jpg"
import RfStudio from "@/assets/images/teste/avatar_md_1495.jpg"
import FmConcepts from "@/assets/images/teste/avatar_md_1291.jpg"
import MediaImpact from "@/assets/images/teste/avatar_md_5309.jpg"
import GGiA from "@/assets/images/teste/avatar_md_9079.jpg"
import AmericaMeanGirls from "@/assets/images/teste/avatar_md_3627.jpg"
import { HomeDiv } from "./home-styles";

export const Home = (): ReactElement => {
    const collectionContentCreators = <>
        <ContentCreatorDiv>
            <CreatorChip
            category="Footjob"
            title="Bratty Foot Girls"
            image={BratyFootGril}
            />
            <CreatorChip
            title="Brat Princess 2"
            category="Cum Eating Instruction"
            image={BratyPrincess}
            />
            <CreatorChip
            title="Media Impact Customs Gigante"
            category="Giantess"
            image={MediaImpact}
            />
            <CreatorChip
            title="Borderland Bound"
            category="Bondage"
            image={Borderland}
            />
            <CreatorChip
            title="RF studio production"
            category="Tickling"
            image={RfStudio}
            />

            <CreatorChip
            title="AMERICAN MEAN GIRLS"
            category="Whipping"
            image={AmericaMeanGirls}
            />
            <CreatorChip
            title="FM Concepts 1080p Bondage Store"
            category="Bondage"
            image={FmConcepts}
            />
            <CreatorChip
            title="Grappling Girls in Action"
            category="Mixed Wrestling"
            image={GGiA}
            />
        </ContentCreatorDiv>
    </>
    return (
        <HomeDiv>
            <div className="defaultPadding">
                <Hero
                    bgColor="#030303"
                    buttonText="Clica aqui"
                    text="Explore trending posts now."
                    title="Discover the latest posts & engage with content!"
                    image={FaceImage}
                />
                <div>
                    
                </div>
            </div>
            <div className="defaultPadding">
                <div className="backgroundStructure">
                    <ItemsColections title="Featured Content Creators" children={collectionContentCreators}
                    />
                </div>
            </div>
        </HomeDiv>
    )
}