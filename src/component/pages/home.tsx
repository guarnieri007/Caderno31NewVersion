import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Hero } from "../common/hero";
import { ItemsColections } from "../common/items-colections";
import { HomeDiv } from "./home-styles";
import { FetchBanners, FetchBestOfMonth, FetchContentCreators, FetchHeroBanners } from "../../api/backendApi";
import { BannerProps, CreatorChipProps, HeroProps, ItemAsCardProps } from "../interfaces";
import { Carrousel } from "../common/carrousel";
import { ContentCreatorDiv } from "../styles/common/common-styles";
import { ItemAsCard } from "../common/itemAsCard";
import { CreatorChip } from "../common/creator-chip";
import { Banner } from "../common/banner";
import { MiniBannerLayout } from "../common/miniBannerLayout";

export const Home = (): ReactElement => {
    const [dataBestOfTheMonth, setDataBestOfTheMonth] = useState<React.JSX.Element>();
    const [collectionContentCreators, setCollectionContentCreators] = useState<React.JSX.Element>();
    const [bannerItems, setBannerItems] = useState<React.JSX.Element>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [heroBanners, setHeroBanners] = useState<ReactNode[]>([]);

    const buildBestofMonth = (content: ItemAsCardProps[]): ReactElement => {
        return (

            <ContentCreatorDiv $numberItemsMobile={1}>
                {content.map((item) => {
                    return (
                        <ItemAsCard key={item.cardId} {...item} />
                    )
                })}
            </ContentCreatorDiv >
        )
    }

    const buildContentCreators = (content: CreatorChipProps[]) => {

        const creatorChipItems =
            <ContentCreatorDiv $numberItemsUHD={4} $numberItemsHD={2}>
                {content.map((item) => {
                    return (
                        <CreatorChip key={item.id} {...item} />
                    )
                })}
            </ContentCreatorDiv>

        return creatorChipItems;
    }

    const buildBanners = (content: BannerProps[]) => {

        const banners = content.map(element => {
            const item = <Banner buttonText={element.buttonText} image={element.image} text={element.text} title={element.title} />
            return item;
        });
        return <MiniBannerLayout items={banners} />
    }

    const buildBannerHero = (content: HeroProps[]) => {
        return (content.map((item) => {
            return (
                <Hero key={item.heroId} {...item} />
            )
        }));
    }

    const getBestOfMonthData = async () => {
        try {
            // Waiting the answer from API
            const content = await FetchBestOfMonth();
            const result = buildBestofMonth(content);

            setDataBestOfTheMonth(result); // Atualize o estado com os dados recebidos
        } catch (error) {
            setError(`Error on load the Best of the Month data:\n${error}`);
        }
    };
    const getCollectionContentCreators = async () => {
        try {
            const content = await FetchContentCreators();
            const result = buildContentCreators(content);
            setCollectionContentCreators(result);
        }
        catch (error) {
            setError((origin) => `${origin}\n\nError on load the Collection Content Creators data:\n${error}`)
        }
    };
    const getBannersData = async () => {
        try {
            const content = await FetchBanners();
            const result = buildBanners(content);
            setBannerItems(result);
        }
        catch (error) {
            setError((last) => `${last}\n\nError on load the Collection Content Creators data:\n${error}`)
        }
    };
    
    const getBannerHero = async () => {
        try {
            const content = await FetchHeroBanners();
            const result = buildBannerHero(content);
            setHeroBanners(result);
            
        }
        catch (error) {
            setError((last) => `${last}\n\nError on load the collection content Banner Hero:\n${error}`)
        }
    }
    
    const getAllSectionData = async () => {
        setLoading(true); //removed the loading for each call individually and now the app will load when we have all the information available
        getBestOfMonthData();
        getCollectionContentCreators();
        getBannersData();
        getBannerHero();
        setLoading(false); //removing the loader when all data is available
    }

    useEffect(() => {
        getAllSectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    if (error) {
        return <div>{error}</div>;
    }
    
    return (
        <HomeDiv>
            {loading && <div>is loading</div>}
            <Carrousel>
                {heroBanners}
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