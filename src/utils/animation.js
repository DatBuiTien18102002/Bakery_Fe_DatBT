export const backInLeft = (duration) => {
    return {
        hidden: {
            x: "-100%",
        },
        show: {
            x: 0,
            transition: {
                type: "spring",
                duration: duration,
            }
        }

    }
}
export const fadeIn = (duration) => {
    return {
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1,
            transition: {
                type: "spring",
                duration: duration,
            }
        }

    }
}