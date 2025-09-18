import { NextResponse } from 'next/server';

const questions = [
  {
    question: "Đâu là năm sinh năm mất của Đại tướng Võ Nguyên Giáp?",
    options: ["1913-2013", "1912-2013", "1911-2013", "1910-2013"],
    answer: 2,
  },
  {
    question: "Quê quán của tác giả ở đâu?",
    options: ["Quảng Bình", "Đà Nẵng", "Hà Nội", "Sài Gòn"],
    answer: 0,
  },
  {
    question: "Ý nào sau đây đúng khi nói về tác giả:",
    options: [
      "Tháng 8/1945, Đại tướng Võ Nguyên Giáp là Ủy viên Ủy ban Quân sự Bắc kì đồng thời là thành viên Ủy ban Khởi nghĩa toàn quốc.",
      "1951-1982, Võ Nguyên Giáp là Ủy viên Bộ chính trị Đảng Cộng sản Việt Nam",
      "1978-1992, là Phó thủ tướng nước Cộng hòa xã hội chủ nghĩa Việt Nam",
      "Tất cả các đáp án trên",
    ],
    answer: 3,
  },
  {
    question: "Tác giả Võ Nguyên Giáp xuất thân là một giáo viên dạy môn gì?",
    options: ["Lịch sử", "Ngữ văn", "Toán học", "Tiếng Anh"],
    answer: 0,
  },
  {
    question: "Võ Nguyên Giáp xuất thân trong một gia đình như thế nào?",
    options: ["Gia đình nông dân", "Gia đình nhà Nho", "Gia đình thương nhân", "Gia đình tư sản"],
    answer: 1,
  },
  {
    question: "Vì sao Đại tướng quyết định triệu tập Đảng ủy Mặt trận họp gấp?",
    options: [
      "Vì muốn thay đổi phương án chiến đấu từ phương án “đánh nhanh thắng nhanh” sang “đánh chắc tiến chắc”",
      "Vì muốn thay đổi phương án chiến đấu từ phương án “đánh chắc tiến chắc”. sang “đánh nhanh thắng nhanh”",
      "Vì muốn gặp mặt một số chiến sĩ",
      "Tất cả các đáp án trên",
    ],
    answer: 0,
  },
  {
    question: "Theo Đại tướng Võ Nguyên Giáp, yếu tố nào đóng vai trò quan trọng nhất trong việc giúp quân ta giành thắng lợi trong Chiến dịch Điện Biên Phủ?",
    options: [
      "Tinh thần chiến đấu quả cảm của bộ đội",
      "Sự lãnh đạo tài tình của Đại tướng Võ Nguyên Giáp",
      "Việc sử dụng chiến thuật 'đánh nhanh thắng nhanh'",
      "Sự hỗ trợ của các nước xã hội chủ nghĩa anh em",
    ],
    answer: 3,
  },
  {
    question: "Đâu không phải nghĩa lịch sử của Chiến dịch Điện Biên Phủ?",
    options: [
      "Là mốc son chói lọi trong lịch sử dân tộc, đánh dấu sự thất bại hoàn toàn của thực dân Pháp và quân đội Mỹ xâm lược",
      "Mở đường cho cuộc kháng chiến chống Mỹ cứu nước của nhân dân ta sau này",
      "Góp phần cổ vũ phong trào giải phóng dân tộc ở các nước thuộc địa trên thế giới",
      "Chiến thắng Điện Biên Phủ là kết quả của sự can thiệp của các cường quốc lớn",
    ],
    answer: 3,
  },
  {
    question: "Chiến dịch Điện Biên Phủ diễn ra trong bao lâu?",
    options: ["56 ngày đêm", "2 tháng", "3 tháng", "Nửa năm"],
    answer: 0,
  },
  {
    question: "Sau khi Chiến dịch Điện Biên Phủ kết thúc, quân ta đã tiến vào giải phóng thủ đô Hà Nội vào ngày nào?",
    options: [
      "10 tháng 10 năm 1954",
      "19 tháng 1 năm 1955",
      "6 tháng 3 năm 1954",
      "20 tháng 7 năm 1954",
    ],
    answer: 0,
  },
];

export async function GET() {
  return NextResponse.json(questions);
}
