import React, { ReactElement, useEffect, useState } from "react";
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
import { ContentCreatorDiv } from "../styles/common/common-styles";
import { MiniBannerLayout } from "../common/miniBannerLayout";
import { BannerProps, ItemAsCardProps } from "../interfaces";
import { Banner } from "../common/banner";
import Computer_bg from "@/assets/images/teste/minibanner/computer_bg.png";
import Laptop_bg from "@/assets/images/teste/minibanner/laptop_bg.png";
import Azukat_bg from "@/assets/images/teste/minibanner/azukat.jpg";
import { ItemAsCard } from "../common/itemAsCard";
import { fetchBestOfMonth } from "@/api/backendApi";

export const Home = (): ReactElement => {
    const [dataBestOfTheMonth, setDataBestOfTheMonth] = useState<ItemAsCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //it will be the variable with all the bannerItems that we want to render on the MiniBannerLayout
    const bannerItems: ReactElement[] = [];

    //Should grab the information from the api server
    const bannerData = [
        { buttonText: "Create Account", image: `url(${Computer_bg})`, title: "Become a creator", text: "Turn your kink into money!" } as BannerProps,
        { buttonText: "Sign up", image: `url(${Laptop_bg})`, title: "Join Caderno31", text: "Signup for free and enjoy customer benefits" } as BannerProps,
        { buttonText: "See more", image: `url(${Azukat_bg})`, title: "The top categorie", text: "Enjoy the foot worship category" } as BannerProps,
    ];

    //for each item, we should transform to the element we want to render on the screen and push each item to the bannerItems const
    bannerData.forEach(element => {
        const item = <Banner buttonText={element.buttonText} image={element.image} text={element.text} title={element.title} />
        bannerItems.push(item);
    });



    const collectionContentCreators = <>
        <ContentCreatorDiv>
            <CreatorChip
                id={1}
                category="Footjob"
                title="Bratty Foot Girls"
                image={BratyFootGril}
            />
            <CreatorChip
                id={2}
                title="Brat Princess 2"
                category="Cum Eating Instruction"
                image={BratyPrincess}
            />
            <CreatorChip
                id={3}
                title="Media Impact Customs Gigante"
                category="Giantess"
                image={MediaImpact}
            />
            <CreatorChip
                id={4}
                title="Borderland Bound"
                category="Bondage"
                image={Borderland}
            />
            <CreatorChip
                id={5}
                title="RF studio production"
                category="Tickling"
                image={RfStudio}
            />

            <CreatorChip
                id={6}
                title="AMERICAN MEAN GIRLS"
                category="Whipping"
                image={AmericaMeanGirls}
            />
            <CreatorChip
                id={7}
                title="FM Concepts 1080p Bondage Store"
                category="Bondage"
                image={FmConcepts}
            />
            <CreatorChip
                id={8}
                title="Grappling Girls in Action"
                category="Mixed Wrestling"
                image={GGiA}
            />
        </ContentCreatorDiv>
    </>

    useEffect(() => {
        const getData = async () => {
            try {
                // Aguarde a resposta da API
                const result = await fetchBestOfMonth();
                setDataBestOfTheMonth(result); // Atualize o estado com os dados recebidos
            } catch (error) {
                setError(`Erro ao carregar os dados do Best of the Month: ${error}`);
            } finally {
                setLoading(false); // Quando terminar, setar loading para false
            }
        };

        getData(); // Chame a função para buscar os dados
    }, []); // O array vazio [] significa que o efeito roda apenas uma vez quando o componente é montado

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }

    const collectionBestOfTheMonth =
        <ContentCreatorDiv>
            {dataBestOfTheMonth.map((item) => {
                return (
                    <ItemAsCard key={item.cardId} {...item} />
                )
            })}
        </ContentCreatorDiv>
    return (
        <HomeDiv>
            <div className="defaultPadding">
                <Hero
                    $bgcolor="#030303"
                    buttonText="Clica aqui"
                    text="Explore trending posts now."
                    title="Discover the latest posts & engage with content!"
                    image={FaceImage}
                />
                <div>

                </div>
            </div>

            <div className="defaultPadding">
                <MiniBannerLayout items={bannerItems} />
            </div>

            <div className="defaultPadding">
                <div className="backgroundStructure">
                    <ItemsColections title="Featured Content Creators" children={collectionContentCreators}
                    />
                    <ItemsColections title="Best of the month" >
                        {collectionBestOfTheMonth}
                    </ItemsColections>
                </div>
            </div>
        </HomeDiv>
    )
}