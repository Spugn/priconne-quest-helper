let equipment_map = new Map();
let equipment_loaded = false;

const equipment_data_version = Object.freeze({
    CURRENT: 'equipment-data-current',
    LEGACY: 'equipment-data-legacy'
});

const equipment_data_location = Object.freeze({
    CURRENT: "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/equipment_data.json",
    LEGACY: "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/equipment_data_08.30.2019.json"
});

let totalItemsCount = reset_equipment_count();

read_equipment_data(equipment_data_version.CURRENT, function ()
{
    equipment_loaded = true;
    console.log("[Equipment Reader] - Equipment data loaded!");
});

function read_equipment_data(equipment_file_type, callback)
{
    // RESET EQUIPMENT COUNTER
    totalItemsCount = reset_equipment_count();

    let file_path;
    if (equipment_file_type === equipment_data_version.LEGACY)
    {
        file_path = equipment_data_location.LEGACY;
    }
    else
    {
        file_path = equipment_data_location.CURRENT;
    }

    console.log("[Equipment Reader] - Reading '" + file_path + "'...");
    return $(function () {
        $.ajax({
            'global': false,
            'url': file_path,
            'dataType': "json",
            'success': function (data) {
                $.when(
                    $.each(data, function(i, itemData)
                    {
                        let item_data = new Map();

                        item_data.set("name", itemData.name);
                        item_data.set("id", itemData.id);
                        /** @namespace itemData.has_fragments */
                        item_data.set("has_fragments", itemData.has_fragments);
                        /** @namespace itemData.req_pieces */
                        item_data.set("req_pieces", itemData.req_pieces);
                        /** @namespace itemData.req_items */
                        item_data.set("req_items", itemData.req_items);

                        equipment_map.set(itemData.name, item_data);

                        // RARITY ITEM COUNTER
                        let rarity_class = itemData.id.substring(0, itemData.id.indexOf('-'));
                        switch (rarity_class)
                        {
                            case "common":
                            case "copper":
                            case "silver":
                            case "gold":
                            case "purple":
                            case "misc":
                                totalItemsCount[rarity_class]++;
                                break;
                            default:
                                // IGNORED
                                break;
                        }
                    })
                ).then(function () {
                    callback();
                });

            }
        });
    });
}

function get_equipment_data(item_name, key)
{
    if (equipment_map.has(item_name))
    {
        return equipment_map.get(item_name).get(key);
    }
    else
    {
        console.log("[Equipment Reader] - " + item_name + " is not found.");
    }
}

function reset_equipment_count()
{
    return {
        common: 0,
        copper: 0,
        silver: 0,
        gold: 0,
        purple: 0,
        misc: 0
    };
}