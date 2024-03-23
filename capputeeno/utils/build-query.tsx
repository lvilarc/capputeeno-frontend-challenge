import { FilterType } from "@/types/filter-type";
import { PriorityType } from "@/types/priority-type";

function getCategoryByType(type: FilterType) {
    if(type == FilterType.MUG) return "mugs"
    if(type == FilterType.SHIRT) return "t-shirts"
    return ""
};

function getFieldByPriority(priority: PriorityType) {
    if(priority === PriorityType.NEWS) return {field: "created_at", order: "ASC"}
    if(priority === PriorityType.BIGGEST_PRICE)  return {field: "price_in_cents", order: "DSC"}
    if(priority === PriorityType.MINOR_PRICE) return {field: "price_in_cents", order: "ASC"}
    return {field: "sales", order: "DSC"}
};


export const buildQuery = (type: FilterType, priority: PriorityType) => {
    if (type === FilterType.ALL && priority === PriorityType.POPULARITY) {
        return `query {
            allProducts(sortField: "sales", sortOrder: "DSC") {
              name
              image_url
              price_in_cents
              id
            }
        }
        `;
    }
    const sortSettings = getFieldByPriority(priority)
    const categoryFilter = getCategoryByType(type)
    return `query {
        allProducts(sortField: "${sortSettings.field}", sortOrder: "${sortSettings.order}", ${categoryFilter ? `filter: { category: "${categoryFilter}"}`: ''}) {
          id
          name
          price_in_cents
          image_url
          category
        }
      }
    `
};







// `query {
//     allProducts {
//      name
//       sales
//       category
//       image_url
//       created_at
//       price_in_cents
//       id
//     }
// }
// `