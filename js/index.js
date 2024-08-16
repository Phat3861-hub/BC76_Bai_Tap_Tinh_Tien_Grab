// NV1: Thực hiện tạo 1 sự kiện click cho nút button tính tiền và DOM tới các input để lấy dữ liệu
// NV2: viết 4 function riêng biệt có nhận tham số để từ các dữ liệu người dùng nhập sẽ xử lý trả về giá kmdautien, giá kmtu1den19 và giá kmtu18trrolen
// NV3: sau khi đã tìm được các giá tiền phù hợp, áp dụng tính toán và trả về kết quả phù hợp nhất
// NV4: Kiểm tra ở phần dưới nút button tính tiền sẽ xuất hiện layout đó vaftrar kết quả (đã chuyển đổi kiểu tiền tệ) vào bên trong để hiển thị ngươi dụng
const GRAB_CAR = "grabCar";
const GRAB_SUV = "grabSUV";
const GRAB_BLACK = "grabBlack";

function giaKmDauTien(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR: {
      return 8000;
    }
    case GRAB_SUV: {
      return 9000;
    }
    case GRAB_BLACK: {
      return 10000;
    }
  }
}
function giaKmTu1Den19(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR: {
      return 7500;
    }
    case GRAB_SUV: {
      return 8500;
    }
    case GRAB_BLACK: {
      return 9500;
    }
  }
}
function giaKmTu19TroLen(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR: {
      return 7000;
    }
    case GRAB_SUV: {
      return 8000;
    }
    case GRAB_BLACK: {
      return 9000;
    }
  }
}

function giaThoiGianCho(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR: {
      return 2000;
    }
    case GRAB_SUV: {
      return 3000;
    }
    case GRAB_BLACK: {
      return 3500;
    }
  }
}

function tinhTienGrab(loaiXe, soKM, thoiGianCho) {
  let tienKmDauTien = giaKmDauTien(loaiXe);
  let tienKmTu1Den19 = giaKmTu1Den19(loaiXe);
  let tienKmTu19TroLen = giaKmTu19TroLen(loaiXe);
  let tienThoiGianCho = giaThoiGianCho(loaiXe);
  let tongTien = 0;
  if (soKM <= 19) {
    tongTien = 1 * tienKmDauTien + (soKM - 1) * tienKmTu1Den19;
  } else {
    tongTien =
      1 * tienKmDauTien + 18 * tienKmTu1Den19 + (soKM - 19) * tienKmTu19TroLen;
  }

  let soLanPhat = Math.floor((thoiGianCho - 1) / 3);
  tongTien += soLanPhat * tienThoiGianCho;
  return tongTien;
}
document.getElementById("tinhTien").onclick = function () {
  let soKM = document.getElementById("txt-km").value * 1;
  let thoiGianCho = document.getElementById("txt-thoiGianCho").value * 1;
  let loaiXeGrab = document.querySelector("input[name='selector']:checked");
  if (loaiXeGrab == null) {
    alert("vui lòng chọn loại xe");
    return;
  }
  let loaiXe = loaiXeGrab.value;

  let tienCuoc = tinhTienGrab(loaiXe, soKM, thoiGianCho);
  document.getElementById("xuatTien").innerHTML = `${Intl.NumberFormat(
    "it-IT",
    {
      style: "currency",
      currency: "VND",
    }
  ).format(tinhTienGrab(loaiXe, soKM, thoiGianCho))}`;
  document.getElementById("divThanhTien").style.display = "block";
};

// tạo một chức năng click cho nút in hóa đơn
document.getElementById("btnInHoaDon").onclick = function () {
  let soKM = document.getElementById("txt-km").value * 1;
  let thoiGianCho = document.getElementById("txt-thoiGianCho").value * 1;
  let loaiXeGrab = document.querySelector("input[name='selector']:checked");
  if (loaiXeGrab == null) {
    alert("vui lòng chọn loại xe");
    return;
  }
  let loaiXe = loaiXeGrab.value;
  $("#exampleModal").modal("show");
  document.querySelector(".modal-body").innerHTML = `
  <table class="table table-bordered  ">
  <thead>
    <tr>
      <th scope="col">Loại xe</th>
      <th colspan="2">${loaiXe}</th>
      <th>Số km : ${soKM}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Chi Tiết</td>
      <td>Sử dụng</td>
      <td>Đơn giá <br>(1000đ)</td>
      <td>Thành tiền <br>(1000đ)</td>
    </tr>
    <tr>
      <td>KM đầu tiên </td>
      <td>1km</td>
      <td>${giaKmDauTien(loaiXe)}</td>
      <td>${giaKmDauTien(loaiXe)}</td>
    </tr>
    ${
      soKM > 1
        ? `
        <tr class ="">
          <td >Km từ 1 đến ${soKM > 19 ? 19 : soKM}</td>
          <td >${soKM > 19 ? 18 : soKM - 1}km </td>
          <td>${giaKmTu1Den19(loaiXe)}</td>
          <td>${giaKmTu1Den19(loaiXe) * (soKM > 19 ? 18 : soKM - 1)}</td>
        </tr>`
        : ""
    }
    ${
      soKM > 19
        ? `
        <tr class ="">
          <td >Km từ 19 trở lên</td>
          <td >${soKM > 19 ? soKM - 19 : ""}km </td>
          <td>${giaKmTu19TroLen(loaiXe)}</td>
          <td>${giaKmTu19TroLen(loaiXe) * (soKM > 19 ? soKM - 19 : "")}</td>
        </tr>`
        : ""
    }
    <tr>
    <td>Thời gian chờ <br> 3 phút đầu free</td>
    <td>${
      thoiGianCho > 3
        ? `chờ ${thoiGianCho}phút, tính tiền ${thoiGianCho - 3} phút`
        : thoiGianCho == 0
        ? 0
        : `chờ ${thoiGianCho} phút`
    }</td>
    <td>${thoiGianCho > 3 ? giaThoiGianCho(loaiXe) : 0}</td>
    <td>${
      thoiGianCho > 3
        ? Math.floor((thoiGianCho - 1) / 3) * giaThoiGianCho(loaiXe)
        : 0
    }</td>
    </tr>
    <tr>
    <td colspan="4" class="text-right">TỔNG TIỀN : <span class="text-danger">${Intl.NumberFormat(
      "it-IT",
      {
        style: "currency",
        currency: "VND",
      }
    ).format(tinhTienGrab(loaiXe, soKM, thoiGianCho))}</span></td>
    </tr>
  </tbody>
</table>
  `;
};
