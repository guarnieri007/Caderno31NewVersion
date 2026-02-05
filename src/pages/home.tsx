import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Hero } from "../component/common/hero";
import { ItemsColections } from "../component/common/items-colections";
import { HomeApi } from "../api/backendApi";
import { BannerProps, CreatorChipProps, HeroProps, ItemAsCardProps } from "../interfaces";
import { Carrousel } from "../component/common/carrousel";
import { ContentCreatorDiv } from "../component/styles/common/common-styles";
import { ItemAsCard } from "../component/common/itemAsCard";
import { CreatorChip } from "../component/common/creator-chip";
import { Banner } from "../component/common/banner";
import { MiniBannerLayout } from "../component/common/miniBannerLayout";
import { useI18n } from "../i18n";

export const Home = (): ReactElement => {
    const { t } = useI18n();
    const [dataBestOfTheMonth, setDataBestOfTheMonth] = useState<React.JSX.Element>();
    const [collectionContentCreators, setCollectionContentCreators] = useState<React.JSX.Element>();
    const [bannerItems, setBannerItems] = useState<React.JSX.Element>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [heroBanners, setHeroBanners] = useState<ReactNode[]>([]);

    const HomeStyle: React.CSSProperties = {
        padding: "0px",
        margin: "0px",
    }

    const { FetchBestOfMonth, FetchContentCreators, FetchBanners, FetchHeroBanners } = HomeApi();

    const buildBestofMonth = (content: ItemAsCardProps[]): ReactElement => {
        return (

            <ContentCreatorDiv number_items_mobile={1}>
                {content.map((item) => {
                    return (
                        <ItemAsCard key={item.id_card} {...item} />
                    )
                })}
            </ContentCreatorDiv >
        )
    }

    const buildContentCreators = (content: CreatorChipProps[]) => {

        const creatorChipItems =
            <ContentCreatorDiv number_items_uhd={4} number_items_hd={2}>
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
            const item = <Banner text_button={element.text_button} image={element.image} text={element.text} title={element.title} />
            return item;
        });
        return <MiniBannerLayout items={banners} />
    }

    const buildBannerHero = (content: HeroProps[]) => {
        return (content.map((item) => {
            return (
                <Hero key={item.id_hero} {...item} />
            )
        }));
    }

    const getBestOfMonthData = async () => {
        try {
            // Waiting the answer from API
            const content = await FetchBestOfMonth();
            const result = buildBestofMonth(content.data);

            setDataBestOfTheMonth(result); // Atualize o estado com os dados recebidos
        } catch (error) {
            setError(`Error on load the Best of the Month data:\n${error}`);
        }
    };
    const getCollectionContentCreators = async () => {
        try {
            const content = await FetchContentCreators();
            const result = buildContentCreators(content.data);
            setCollectionContentCreators(result);
        }
        catch (error) {
            setError((origin) => `${origin}\n\nError on load the Collection Content Creators data:\n${error}`)
        }
    };
    const getBannersData = async () => {
        try {
            const content = await FetchBanners();
            const result = buildBanners(content.data);
            setBannerItems(result);
        }
        catch (error) {
            setError((last) => `${last}\n\nError on load the Collection Content Creators data:\n${error}`)
        }
    };

    const getBannerHero = async () => {
        try {
            const content = await FetchHeroBanners();
            const result = buildBannerHero(content.data);
            console.log(`Hero banners result: ${JSON.stringify(result)}`);
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
        <>
            <div>

                <Carrousel>
                    {heroBanners}
                </Carrousel>
            </div>

            <div style={HomeStyle}>
                {loading && <div>{t('pages.home.loading', undefined, 'is loading')}</div>}

                <div className="defaultPadding grid3items">
                    {bannerItems}
                </div>

                <div className="defaultPadding">
                    <div className="backgroundStructure">
                        <ItemsColections title={t('pages.home.titleFeaturedCreators', undefined, 'Featured Content Creators')} children={collectionContentCreators}
                        />
                        <ItemsColections title={t('pages.home.titleBestOfMonth', undefined, 'Best of the month')} >
                            {dataBestOfTheMonth}
                        </ItemsColections>
                    </div>
                </div>
            </div>
        </>
    )
}
