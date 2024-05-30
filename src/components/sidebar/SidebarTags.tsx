import SidebarRow from "./SidebarRow";
import { useEffect } from "react";
import { useStores } from "../../store";
import { observer } from "mobx-react";

const SidebarTags = () => {
    const { bookmarkStore, tagStore } = useStores();

    useEffect(() => {
        tagStore.updateTotalsCounts();
    }, [bookmarkStore.bookmarks, bookmarkStore]);

    const allItemsSelected = tagStore.activeFilter.name === tagStore.allItemsFilter.name;
    const taggedSelected = tagStore.activeFilter.name === tagStore.taggedItemsFilter.name;
    const untaggedSelected = tagStore.activeFilter.name === tagStore.untaggedItemsFilter.name;

    return (
        <div>
            <SidebarRow
                active={allItemsSelected}
                name="All Items"
                icon="emergency"
                count={tagStore.allItemsFilter.count}
                onClick={() => tagStore.setActiveFilter(tagStore.allItemsFilter)}
            />
            {/* <SidebarRow
            active={taggedSelected}
            onClick={() => tagStore.setActiveFilter(tagStore.taggedItemsFilter)}
            name="Tagged"
            count={tagStore.taggedItemsFilter.count}
            /> */}
            <SidebarRow
                active={untaggedSelected}
                onClick={() => tagStore.setActiveFilter(tagStore.untaggedItemsFilter)}
                name="Untagged"
                icon="question_mark"
                count={tagStore.untaggedItemsFilter.count}
                style={{ marginBottom: 10 }}
            />
            {tagStore.tagSet.map((tag, i) => (
                <SidebarRow
                    color={tag.color}
                    icon={tag.icon}
                    active={tagStore.activeFilter.name === tag.name}
                    onClick={() => tagStore.setActiveFilter(tag)}
                    key={`${i}-${tag.name}`}
                    name={tag.name}
                    count={tag.count}
                    index={i}
                    allowEdit
                />
            ))}
        </div>
    );
};

export default observer(SidebarTags);
