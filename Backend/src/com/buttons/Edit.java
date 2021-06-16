package com.milestone2;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//@WebServlet("/Edit")
public class Edit extends HttpServlet {
	private static final long serialVersionUID = 1L;

	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship?zeroDateTimeBehavior=convertToNull";

    public Edit() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String USER = "root";
	    String PASS = "amrit";
	     
	     PreparedStatement stmt = null;
	     Connection conn = null;
	  
	     
    	
	     try {
	    	 Class.forName(JDBC_DRIVER);

	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);

	    	 //String invoice_id = request.getParameter("invoice_id");
	    	 int invoice_id = Integer.parseInt(request.getParameter("invoice_id"));
	    	 double total_open_amount = request.getParameter("total_open_amount") != null ? Double.parseDouble(request.getParameter("total_open_amount")) : 0;
	    	 String notes = request.getParameter("notes");
		     
	    	 String sql = "UPDATE invoice_details SET total_open_amount='"+total_open_amount+"', notes='"+notes+"' WHERE invoice_id='"+invoice_id+"'";
	    	 stmt = conn.prepareStatement(sql);
	    	 
	    	 stmt.executeUpdate();  
	              
	       	 	
	    	 	stmt.close();
	       	 	conn.close();  
	     }
	       	 	catch(Exception e) {
	       	 		
	       	 		e.printStackTrace();
	       	 	}	

	}

}
