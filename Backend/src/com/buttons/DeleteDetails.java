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

/**
 * Servlet implementation class Delete
 */
//@WebServlet("/Delete")
public class DeleteDetails extends HttpServlet {
		
	private static final long serialVersionUID = 1L;
	
	
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship?zeroDateTimeBehavior=convertToNull";
    
       
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteDetails() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String USER = "root";
	    String PASS = "amrit";

	     Connection conn = null;
	     
	     try {
	    	 Class.forName(JDBC_DRIVER);
	    	 
	    	 int invoice_id = Integer.parseInt(request.getParameter("invoice_id"));
	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);
	    	 String sql = "DELETE FROM invoice_details WHERE invoice_id="+invoice_id+"";
	    	 PreparedStatement ps = conn.prepareStatement(sql);
	    	 	//ps.seti(1,invoice_id);  
	            ps.executeUpdate();  
	    	 
	    		conn.close();  
	     }
	     catch(Exception e) {
	    	 e.printStackTrace();
	     }	
	}

}

