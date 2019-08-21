<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/productList">
              <i class="fas fa-box-open" style="margin-right: 10px"></i>產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orderList">
              <i class="fas fa-book-open" style="margin-right: 10px"></i>訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons">
              <i class="fas fa-ticket-alt" style="margin-right: 10px"></i>優惠券
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>