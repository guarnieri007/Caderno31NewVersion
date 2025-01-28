import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Hero } from "../common/hero";
import FaceImage from "@/assets/images/face.png";
import { ItemsColections } from "../common/items-colections";
import { HomeDiv } from "./home-styles";
import { FetchBanners, FetchBestOfMonth, FetchContentCreators } from "../../api/backendApi";
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

    const buildBestofMonth = (content: ItemAsCardProps[]):ReactElement => {
        return (

        <ContentCreatorDiv>
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
                <ContentCreatorDiv>
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

    useEffect(() => {

        const getBestOfMonthData = async () => {
            try {
                // Waiting the answer from API
                const content = await FetchBestOfMonth();
                  const result = buildBestofMonth(content);

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
                const content = await FetchContentCreators();
                const result = buildContentCreators(content);
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
                const content = await FetchBanners();
                const result = buildBanners(content);
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