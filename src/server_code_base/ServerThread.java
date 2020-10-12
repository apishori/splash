import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.Socket;
import java.net.URL;

public class ServerThread extends Thread{

	private String APIURL = "https://api.openweathermap.org/data/2.5/weather?lat=34.021160&lon=-118.287132&appid=ae12678dfe574213d28bc3b357cd6fc6&units=imperial";
	private BufferedReader br1;
	private BufferedReader br2;
	private PrintWriter pw;
	public ServerThread(Socket s) {
		try {
			this.br1 = new BufferedReader(new InputStreamReader(s.getInputStream()));
			this.pw = new PrintWriter(s.getOutputStream());
			this.start();

		} catch (IOException ioe) {
			System.out.println("ioe");
		}
	}

	public void run() {
		HttpURLConnection c = null;
		try {
			URL url = new URL(APIURL);
			c = (HttpURLConnection) url.openConnection();
			c.setRequestMethod("GET");
			c.connect();
			br2 = new BufferedReader(new InputStreamReader(c.getInputStream()));
			String jsonString = br2.readLine().trim();
			pw.println(jsonString);
			pw.flush();

		} catch (IOException ioe) {
			//when a client disconnect, this will be thrown
			System.out.println("ioe");
		}
	}
}