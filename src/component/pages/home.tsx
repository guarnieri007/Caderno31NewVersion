import React, { ReactElement, useEffect, useState } from "react";
import { Hero } from "../common/hero";
import FaceImage from "@/assets/images/face.png";
import { ItemsColections } from "../common/items-colections";
import { HomeDiv } from "./home-styles";
import { MiniBannerLayout } from "../common/miniBannerLayout";
import { BannerProps } from "../interfaces";
import { Banner } from "../common/banner";
import Computer_bg from "@/assets/images/teste/minibanner/computer_bg.png";
import Laptop_bg from "@/assets/images/teste/minibanner/laptop_bg.png";
import Azukat_bg from "@/assets/images/teste/minibanner/azukat.jpg";
import { fetchBestOfMonth, fetchContentCreators } from "@/api/backendApi";

export const Home = (): ReactElement => {
    const [dataBestOfTheMonth, setDataBestOfTheMonth] = useState<React.JSX.Element>();
    const [collectionContentCreators, setCollectionContentCreators] = useState<React.JSX.Element>();
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

    useEffect(() => {
        const getBestOfMonthData = async () => {
            try {
                // Aguarde a resposta da API
                const result = await fetchBestOfMonth();
                setDataBestOfTheMonth(result); // Atualize o estado com os dados recebidos
            } catch (error) {
                setError(`Error on load the Best of the Month data:\n${error}`);
            } finally {
                setLoading(false); // Quando terminar, setar loading para false
            }
        };

        
        const getCollectionContentCreators = async () => {
            setLoading(true);
            try {
                const result = await fetchContentCreators();
                setCollectionContentCreators(result);
            }
            catch (error) {
                setError((origin) => `${origin}\n\nError on load the Collection Content Creators data:\n${error}`)
            }
            finally{
                setLoading(false);
            }
        };
        
        getBestOfMonthData();
        getCollectionContentCreators();
        
    }, []);

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }

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
                        {dataBestOfTheMonth}
                    </ItemsColections>
                </div>
            </div>
        </HomeDiv>
    )
}