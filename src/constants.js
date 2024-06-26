import images from "@/assets/images";

export const sectionMenu = [
    {
        href: "#Introduce",
        title: "Giới thiệu"
    },
    {
        href: "#DiscoverMenu",
        title: "Khám phá menu"
    },
    {
        href: "#Comment",
        title: "Bình luận"
    },
    {
        href: "#ServiceTime",
        title: "Thời gian hoạt động"
    },
    {
        href: "#ImageShop",
        title: "Hình ảnh quán"
    },
]

export const featuredComments = [
    {
        avatar: images.commentAvatar.avatar1,
        name: "Anh Dương Lâm",
        star: 4,
        desc: "Tôi rất thích đưa gia đình đến đây vì phong cách rất chuyên nghiệp, bánh ngon và không gian quán cũng rất đẹp và sang trọng.",
    },
    {
        avatar: images.commentAvatar.avatar2,
        name: "Chị Đức Bo",
        star: 3,
        desc: "Trai ở đây rất đẹp, tôi là người thích sống ảo nên rất thích đến đây để chụp những tấm ảnh đẹp cùng bạn bè, theo mình thì đây cũng là nơi lý tưởng để hẹn hò.",
    },
    {
        avatar: images.commentAvatar.avatar3,
        name: "Anh Tấn Trung",
        star: 5,
        desc: "Mình rất hài lòng về thái độ phục vụ của quán , chủ quán rất đẹp trai thân thiện, bánh rất ngon, mình sẽ còn mua bánh ở đây nhiều lần nữa.",
    },
    {
        avatar: images.commentAvatar.avatar4,
        name: "Anh Bray",
        star: 4,
        desc: "Mình rất hài lòng về thái độ phục vụ của quán, bánh rất ngon, mình sẽ còn mua bánh ở đây nhiều lần nữa.",
    },
];

export const menuDiscover = [
    {
        image: images.discoverCake.cupcake,
        name: "Cupcake Chocolate",
    },
    {
        image: images.discoverCake.tiramisu,
        name: "Tiramisu Cake",
    },
    {
        image: images.discoverCake.fritter,
        name: "Dorayaki Cake",
    },
    {
        image: images.discoverCake.donut,
        name: "Donut Cake",
    },
    {
        image: images.discoverCake.pancake,
        name: "Pancake Cake",
    },
    {
        image: images.discoverCake.strawberryCake,
        name: "Chocolate Cake",
    },
];

export const statsAboutUs = [
    {
        count: 50,
        label: "Nhân viên tiệm bánh",
    },
    {
        count: 3200,
        label: "Khách hàng",
    },
    {
        count: 70,
        label: "Các loại bánh ngọt",
    },
]

export const advAboutUs = [
    {
        icon: images.aboutIcon.aboutIcon1,
        title: "Giao Hàng Nhanh",
        desc: "Tận hưởng niềm vui đón nhận bánh tươi ngon ngay tại cửa nhà bạn. Chúng tôi cam kết giao hàng nhanh chóng và đúng hẹn, để bạn có thêm thời gian thảnh thơi thưởng thức món ngọt."
    },
    {
        icon: images.aboutIcon.aboutIcon2,
        title: "Chất Lượng Cao",
        desc: "Mỗi chiếc bánh là sản phẩm của tình yêu và tâm huyết, được chế biến từ những nguyên liệu tốt nhất và quy trình nghiêm ngặt để đảm bảo hương vị hoàn hảo."
    },
    {
        icon: images.aboutIcon.aboutIcon3,
        title: "Ưu Đãi Tốt Nhất",
        desc: "Bạn xứng đáng nhận được điều tốt nhất, và chúng tôi hiểu điều đó. Chúng tôi mang đến những ưu đãi đặc biệt, giảm giá hấp dẫn và quà tặng thú vị để bạn cảm nhận sự trân trọng của chúng tôi đối với sự ủng hộ của bạn."
    },
    {
        icon: images.aboutIcon.aboutIcon4,
        title: "Thanh Toán An Toàn",
        desc: "Sự an toàn của thông tin cá nhân và giao dịch thanh toán là ưu tiên hàng đầu. Với hệ thống thanh toán được bảo mật hàng đầu, bạn có thể yên tâm thực hiện giao dịch một cách an toàn và tiện lợi."
    },
]

export const headingFilter = [
    {
        tittle: "Tên sản phẩm",
        name: "name",
    },
    {
        tittle: "Giá sản phẩm",
        name: "price",
    },
];

export const filterList = [
    {
        tittle: `A đến Z`,
        name: "name",
        type: "asc",
        heading: "",
    },
    {
        tittle: "Z đến A",
        name: "name",
        type: "desc",
    },
    {
        tittle: "Cao đến thấp",
        name: "price",
        type: "desc",
    },
    {
        tittle: "Thấp đến cao",
        name: "price",
        type: "asc",
    },
];
