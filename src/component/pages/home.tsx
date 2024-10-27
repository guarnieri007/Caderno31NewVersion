import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Hero } from "../common/hero";
import FaceImage from "@/assets/images/face.png";
import { ItemsColections } from "../common/items-colections";
import { HomeDiv } from "./home-styles";
import { FetchBanners, FetchBestOfMonth, FetchContentCreators } from "@/api/backendApi";
import { HeroProps } from "../interfaces";
import { Carrousel } from "../common/carrousel";

export const Home = (): ReactElement => {
    const [dataBestOfTheMonth, setDataBestOfTheMonth] = useState<React.JSX.Element>();
    const [collectionContentCreators, setCollectionContentCreators] = useState<React.JSX.Element>();
    const [bannerItems, setBannerItems] = useState<React.JSX.Element>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [heroBanners, setHeroBanners] = useState<ReactNode[]>([]);

    useEffect(() => {

        const getBestOfMonthData = async () => {
            try {
                // Waiting the answer from API
                const result = await FetchBestOfMonth();
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
                const result = await FetchContentCreators();
                setCollectionContentCreators(result);
            }
            catch (error) {
                setError((origin) => `${origin}\n\nError on load the Collection Content Creators data:\n${error}`)
            }
            finally{
                setLoading(false);
            }
        };
        const getBannersData = async () => {
            setLoading(true);
            try {
                const result = await FetchBanners();
                setBannerItems(result);
            }
            catch (error) {
                setError((last) => `${last}\n\nError on load the Collection Content Creators data:\n${error}`)
            }
            finally {
                setLoading(false);
            }
        };
        
        getBestOfMonthData();
        getCollectionContentCreators();
        getBannersData();
        const heroData:HeroProps[] = [
            {
                heroId: 1,
                $bgcolor: "#030303",
                buttonText: "See more",
                text: "Explore trending posts now.",
                title: "Discover the latest posts & engage with content!",
                image: FaceImage
            },
            {
                heroId: 2,
                $bgcolor: "#102048",
                buttonText: "See more",
                text: "Second banner hero",
                title: "Created the carrousel for the site!",
                image: FaceImage
            }
        ]

        setHeroBanners(heroData.map((item) => {
            return(
                <Hero key={item.heroId} {...item} />
            )
        }));

    }, []);

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }

    return (
        <HomeDiv>
            <Carrousel>
                {Array.from(heroBanners)}
            </Carrousel>

            <div className="defaultPadding grid3items">
                {bannerItems}
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