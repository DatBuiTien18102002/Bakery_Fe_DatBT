export const backInLeft = (duration = 0, delay = 0) => {
    return {
        hidden: {
            x: "-100%",
        },
        show: {
            x: 0,
            transition: {
                type: "spring",
                duration: duration,
                delay: delay,
            }
        }

    }
}
export const fadeIn = (duration = 0, delay = 0) => {
    return {
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1,
            transition: {
                type: "spring",
                duration: duration,
                delay: delay,
            }
        }

    }
}