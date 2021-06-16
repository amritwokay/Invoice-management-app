package com.milestone2;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class FetchDetails extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	 static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";  
	   static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
	   //  Database credentials
	   static final String USER = "root";
	   static String PASS = "amrit";
       

    public FetchDetails() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    PrintWriter out = response.getWriter();
	    List<Pojo> obj = new ArrayList<>();
	    Connection conn = null;
		Statement stmt = null;
		int limit = Integer.parseInt(request.getParameter("limit"));
		int starting = Integer.parseInt(request.getParameter("start"));
		try {
			 Class.forName(JDBC_DRIVER);
		      conn = DriverManager.getConnection(DB_URL,USER,PASS);
		      stmt = conn.createStatement();
		      String sql = "SELECT * FROM invoice_details LIMIT "+starting+", "+limit+"";
//		      System.out.println(starting+"\t"+limit);
		      ResultSet rs = stmt.executeQuery(sql);
		      while(rs.next()) {
		    	  Pojo head = new Pojo();

		    	  head.setBusinessCode(rs.getString(1));
		    	  head.setCustNumber(rs.getString(2));
		    	  head.setCustName(rs.getString(3));
		    	  head.setClearDate(rs.getDate(4));
		    	  head.setBusinessYear(rs.getFloat(5));
		    	  head.setDocId(rs.getDouble(6));
		    	  head.setPostingDate(rs.getDate(7));
		    	  head.setDocumentCreateDate(rs.getDate(8));
		    	  head.setDueInDate(rs.getDate(9));
		    	  head.setInvoiceCurrency(rs.getString(10));
		    	  head.setDocumentType(rs.getString(11));
		    	  head.setPostingId(rs.getFloat(12));
		    	  head.setAreaBusiness(rs.getString(13));
		    	  head.setTotalOpenAmount(rs.getDouble(14));
		    	  head.setBaseLineCreateDate(rs.getDate(15));
		    	  head.setCustomerPaymentTerms(rs.getString(16));
		    	  head.setInvoiceId(rs.getDouble(17));
		    	  head.setIsOpen(rs.getInt(18));
		    	  head.setNotes(rs.getString(19));
		    	  
		    	  obj.add(head);
		      }
		      
		}catch(Exception e) {
			e.printStackTrace();
		}
		String json = new Gson().toJson(obj);   
	    out.write(json);
	    out.close();
	    
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}