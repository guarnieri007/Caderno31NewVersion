// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import Computer_bg from "@/assets/images/teste/minibanner/computer_bg.png";
import Laptop_bg from "@/assets/images/teste/minibanner/laptop_bg.png";
import Azukat_bg from "@/assets/images/teste/minibanner/azukat.jpg";
import BratyFootGril from "@/assets/images/teste/avatar_md_5147.jpg"
import BratyPrincess from "@/assets/images/teste/avatar_md_4299.jpg"
import Borderland from "@/assets/images/teste/avatar_md_687.jpg"
import RfStudio from "@/assets/images/teste/avatar_md_1495.jpg"
import FmConcepts from "@/assets/images/teste/avatar_md_1291.jpg"
import MediaImpact from "@/assets/images/teste/avatar_md_5309.jpg"
import GGiA from "@/assets/images/teste/avatar_md_9079.jpg"
import AmericaMeanGirls from "@/assets/images/teste/avatar_md_3627.jpg"
import { BannerProps, CreatorChipProps, ItemAsCardProps } from '@/component/interfaces';

// Aqui você define os endpoints que serão simulados
export const handlers = [
  // Exemplo de um GET request para "/api/users"
  http.get('/api/bestofmonth', async () => {
    //await delay(1000)
    const list: ItemAsCardProps[] = [
      { cardId: 1, category: "Foot Worship", currency: "real", price: 15.05, profileImage: `${MediaImpact}`, creatorsName: "Media Impact Customs Gigante", image: `${MediaImpact}`, title: "Testing this new foot slave", mediaInfo: { amountAudios: 12, amountPhotos: 22, amountVideos: 32 } },
      { cardId: 2, category: "Foot Worship", currency: "real", price: 5.05, profileImage: `${BratyPrincess}`, creatorsName: "Brat Princess 2", image: `${BratyPrincess}`, title: "Licking feet", mediaInfo: { amountAudios: 0, amountPhotos: 2, amountVideos: 0 } },
      { cardId: 3, category: "Foot Worship", currency: "real", price: 25.30, profileImage: `${BratyFootGril}`, creatorsName: "Bratty Foot Girls", image: `${BratyFootGril}`, title: "Dirty feet", mediaInfo: { amountAudios: 0, amountPhotos: 0, amountVideos: 1 } },
      { cardId: 4, category: "Foot Worship", currency: "real", price: 60.50, profileImage: `${Azukat_bg}`, creatorsName: "Gabi", image: `${Computer_bg}`, title: "Testing", mediaInfo: { amountAudios: 1, amountPhotos: 2, amountVideos: 0 } },
      { cardId: 5, category: "Foot Worship", currency: "real", price: 7.05, profileImage: `${AmericaMeanGirls}`, creatorsName: "Dani Queen", image: `${RfStudio}`, title: "Testing", mediaInfo: { amountAudios: 1, amountPhotos: 0, amountVideos: 6 } },
      { cardId: 6, category: "Foot Worship", currency: "real", price: 8.05, profileImage: `${Borderland}`, creatorsName: "Borderland Bound", image: `${Laptop_bg}`, title: "Testing", mediaInfo: { amountAudios: 12, amountPhotos: 21, amountVideos: 13 } },
      { cardId: 7, category: "Foot Worship", currency: "real", price: 10.40, profileImage: `${GGiA}`, creatorsName: "Gina", image: `${Computer_bg}`, title: "Testing", mediaInfo: { amountAudios: 13, amountPhotos: 3, amountVideos: 32 } },
    ]
    return HttpResponse.json(Array.from(list));
  }),
  
  http.get('api/contentCreator', async () => {
    //await delay(2000)
    const list: CreatorChipProps[] = [
      {
        id: 1,
        category: "Footjob",
        title: "Bratty Foot Girls",
        image: BratyFootGril,
      },
      {
        id: 2,
        title: "Brat Princess 2",
        category: "Cum Eating Instruction",
        image: BratyPrincess,
      },
      {
        id: 3,
        title: "Media Impact Customs Gigante",
        category: "Giantess",
        image: MediaImpact,
      },
      {
        id: 4,
        title: "Borderland Bound",
        category: "Bondage",
        image: Borderland,
      },
      {
        id: 5,
        title: "RF studio production",
        category: "Tickling",
        image: RfStudio,
      },
      {
        id: 6,
        title: "AMERICAN MEAN GIRLS",
        category: "Whipping",
        image: AmericaMeanGirls,
      },
      {
        id: 7,
        title: "FM Concepts 1080p Bondage Store",
        category: "Bondage",
        image: FmConcepts,
      },
      {
        id: 8,
        title: "Grappling Girls in Action",
        category: "Mixed Wrestling",
        image: GGiA,
      },
    ]
    return HttpResponse.json(Array.from(list));
  }),
  
  http.get('api/bannerItems', async () => {
    //await delay(3000)
    const list: BannerProps[] =
    [
      { buttonText: "Create Account", image: `url(${Computer_bg})`, title: "Become a creator", text: "Turn your kink into money!" },
      { buttonText: "Sign up", image: `url(${Laptop_bg})`, title: "Join Caderno31", text: "Signup for free and enjoy customer benefits" },
        { buttonText: "See more", image: `url(${Azukat_bg})`, title: "The top categorie", text: "Enjoy the foot worship category" },
      ]

      return HttpResponse.json(Array.from(list));
  }),

  http.post('/api/userAccount', async ({ request}) => {
    const userAccount = await request.json();

    // Lógica para simular a criação de uma conta:
    if (userAccount && email && password) {
      // Simulação de sucesso na criação da conta
      return res(
        ctx.status(201), // HTTP 201 Created
        ctx.json({
          message: "Account successfully created",
          user: {
            id: 1, // Simula um ID para o novo usuário
            username,
            email,
          },
          token: "fake-jwt-token", // Simula um token de autenticação
        })
      );
    } else {
      // Simulação de erro se faltar algum campo obrigatório
      return res(
        ctx.status(400),
        ctx.json({
          error: "Missing required fields"
        })
      );
    }
  }),
];