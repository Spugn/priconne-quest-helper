function read_purple()
{
    const totalPurpleItems = 48;

    let itemMap = new Map();

    for (let i = 1 ; i < totalPurpleItems + 1 ; i++)
    {
        /* ROUND UP VALUE */
        let itemValue = Math.round(document.getElementById("purple-" + i + "-amt").value);
        document.getElementById("purple-" + i + "-amt").value = itemValue;

        if (itemValue >= 1)
        {
            /* CHECK VALUE: IF GREATER THAN 100, THEN CORRECT THE ISSUE */
            if (itemValue > 99)
            {
                document.getElementById("purple-" + i + "-amt").value = 99;
                itemValue = 99;
            }

            let itemName = document.getElementById("purple-" + i).title;
            itemMap.set(itemName, itemValue);
        }
    }

    return itemMap;
}