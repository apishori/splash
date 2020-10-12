import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Vector;

public class JavaServer {

	public JavaServer(int port) {
		try {
			ServerSocket ss = new ServerSocket(port);
			while(true) { //loop forever and accept all clients
				Socket s = ss.accept(); //blocking
				ServerThread st = new ServerThread(s); //this will start a new thread
			}

		} catch (IOException e) {
			System.out.println("exception " + e.getMessage());
		}

	}

	public static void main(String [] args) {
		new JavaServer(6789);
	}
}