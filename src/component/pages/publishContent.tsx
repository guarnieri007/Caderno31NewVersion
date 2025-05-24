import { ReactElement } from "react"
import { InputFIeld } from "../common/input-field";
import { UIIcons } from "../icons";
import { PublishContentStyle } from "../styles/pages/publishContent";
import { CategorySelector } from "../common/categorySelector";
import { CategoryProps } from "../../interfaces";
export const PublishContent = (): ReactElement => {


    return (
        <PublishContentStyle>
            <div className="card_style">
                <h1 className="title_style">Post a new content</h1>
                <form action="">
                    <InputFIeld
                        label="Description"
                        maxLength={250}
                        name="description"
                        placeholder="Put here the description of your content"
                        type="text"
                        icon={UIIcons.Book}
                    />

                    <CategorySelector
                        name="category"
                        max_selection={3}
                        placeHolder="Select the desired categories"
                        selected_categories={[
                            {
                                cd_category: 1,
                                ds_category: "Tech",
                                status: "A"
                            },
                        ] as CategoryProps[]}
                        all_categories={
                            [
                                {
                                    cd_category: 1,
                                    ds_category: "Tech",
                                    status: "A"
                                },
                                {
                                    cd_category: 2,
                                    ds_category: "Religion",
                                    status: "A"
                                },
                                {
                                    cd_category: 3,
                                    ds_category: "Food",
                                    status: "A"
                                },
                                {
                                    cd_category: 4,
                                    ds_category: "Futebol",
                                    status: "A"
                                },
                                {
                                    cd_category: 5,
                                    ds_category: "Dance",
                                    status: "A"
                                },
                                {
                                    cd_category: 6,
                                    ds_category: "Computer",
                                    status: "A"
                                },

                            ] as CategoryProps[]}
                    />
                </form>
            </div>

        </PublishContentStyle>
    )
}