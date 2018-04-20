
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/stylesheets/style.css">
    <link rel="stylesheet" href="/stylesheets/chunkfive-fontface.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="//netsh.pp.ua/upwork-demo/1/js/typeahead.js"></script>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Exo:400,500,500italic,400italic,600,600italic,700,700italic,800,800italic,300,300italic);
    
    body {
      
      /*The below background is just to add some color, you can set this to anything*/
      background: url(http://s3.amazonaws.com/lumi-blog/_coverWide/corrugate-pricing-lumi.jpg) no-repeat;
    }
    .tt-hint,
        .product-item {
           width: 100%;
      border-radius: 2px;
      border: 1px solid #dadada;
      padding: 5px;
          margin: 10px;
        }

        .tt-dropdown-menu {
            width: 100%;
            margin-top: 0px;
            padding: 8px 12px;
            background-color: #fff;
            
            font-size: 18px;
            color: #111;
            background-color: #F1F1F1;
        }
    .product-field{
    width: 100%;
      border-radius: 2px;
      border: 1px solid #dadada;
      padding: 5px;
          margin: 10px;
      }
    .row{
      width:100%;
    }
    .item-section{
          padding-left: 5px;
          float: left;
          width: 30%;
    }
    .row label{
    font-weight: bold;
      font-size: 15px;
      color: gray;
      }
      .input-group-addon{
     width: 10px;
     } 
     .header_title
     {
          padding: 20px;
          background: #3493d8;
          position: fixed;
        width: 100%;
        z-index: 999;
     }
     .header_title_name{
            width: 50%;
              float: left;
             color: white;
     }
      .header_title_logout{
            width: 49%;
              float: left;
             color: white;
             text-align:right;
     }
  .sidenav {
    height: 100%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 50px;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;
}

.sidenav a {
    
    text-decoration: none;
    font-size: 18px;
    color: #818181;
    display: block;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.main {
    float:right; /* Same as the width of the sidenav */
    padding-top:50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
     
  </style>
  <body>
  <div class="header_title">
     <div class="header_title_name"><i class="fa fa-user" aria-hidden="true"></i> Login : Admin</div>
     <div class="header_title_logout"><a href="/logout" style="color:white;" >Log Out</a></div>
     <div style="clear:both;"></div>
  </div>  
   <div class="sidenav">
  <a href="/adminOrders/getOrders">All Orders</a>
  
  
</div>
<div class="main">    
 <div class="container login-form">
  
  <h3 style="clear:both;"  class="login-title">All Orders</h3>
  <div class="panel panel-default">
    <div class="panel-body" style="overflow-y: scroll; height:500px;">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Product Name</th>
              <th>Status</th>
              <th>Order Amount</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          <% myOrders.forEach(function(order) { %>
            <tr>
              <td><%= order.order_id %></td>
              <td><%= order.product_name %></td>
              <td><%= order.order_status %></td>
              <td><%= order.order_amount %></td>
              <td><%= order.created_date %></td>
              <td>
                <%if (order.order_amount > 1000 && order.order_status === 'Processing') { %>
                <a href="orderApprove/<%= order.order_id %>" style="background: #337ab7;color: #fff;border-radius: 5px;text-decoration: none;padding: 6px;">Approve</a>
                &nbsp;
                <a href="orderReject/<%= order.order_id %>" style="background: #337ab7;color: #fff;border-radius: 5px;text-decoration: none;padding: 6px;">Reject</a>
                <% } %>
              </td>
            </tr>
          <% }); %> 
          </tbody>
        </table>
          
    </div>
  </div>
 </div>
 </div>

</body>
</html>
