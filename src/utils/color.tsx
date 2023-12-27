export const calculateTextColor = (color: string) => {
    if (color.length !== 7) {
        return 'black'
    }
    const brightness = Math.round(
        (parseInt('0x' + color.slice(1, 3)) * 299 +
            parseInt('0x' + color.slice(3, 5)) * 587 +
            parseInt('0x' + color.slice(5, 7)) * 114) /
            1000
    )
    return brightness > 125 ? 'black' : 'white'
}
