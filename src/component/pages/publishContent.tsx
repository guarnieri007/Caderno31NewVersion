import { ReactElement } from "react"
import { InputFIeld } from "../common/input-field";
import { UIIcons } from "../icons";
import { PublishContentStyle } from "../styles/pages/publishContent";
import { CategorySelector } from "../common/categorySelector";
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

                    <CategorySelector />
                </form>
            </div>

        </PublishContentStyle>
    )
}