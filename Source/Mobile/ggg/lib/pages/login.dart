import 'package:flutter/material.dart';
import 'package:ggg/get_yo_girl_a_gift.dart';
import 'package:ggg/pages/user.dart';

// getyogirlagift.azurewebsites.net
// uint8list

class Data {
  User user;
  GetYoGirlAGiftClient client;
  String token;

  Data(User user, GetYoGirlAGiftClient client, String token)
  {
    this.user = user;
    this.client = client;
    this.token = token;
  }
}

class Login extends StatefulWidget {
  Login({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {

  Uri baseAddress = Uri.http("getyogirlagift.azurewebsites.net", "");

  TextEditingController _usernameController;
  TextEditingController _passwordController;

  @override
  void initState() {
    super.initState();
    _usernameController = TextEditingController();
    _passwordController = TextEditingController();
  }

  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final titleText = Text.rich(
      TextSpan(
        children: <TextSpan>[
          TextSpan(text: "G", style: 
            TextStyle(fontWeight: FontWeight.bold, decoration: TextDecoration.underline, 
              fontSize: 30.0, color: Colors.white)),
          TextSpan(text: "et yo ", style: TextStyle(fontWeight: FontWeight.bold, 
            fontSize: 30.0, color: Colors.white)),
          TextSpan(text: "G", style: 
            TextStyle(fontWeight: FontWeight.bold, decoration: TextDecoration.underline, 
              fontSize: 30.0, color: Colors.white)),
          TextSpan(text: "irl a ", style: TextStyle(fontWeight: FontWeight.bold, 
            fontSize: 30.0, color: Colors.white)),
          TextSpan(text: "G", style: 
            TextStyle(fontWeight: FontWeight.bold, decoration: TextDecoration.underline, 
              fontSize: 30.0, color: Colors.white)),
          TextSpan(text: "ift", style: TextStyle(fontWeight: FontWeight.bold, 
            fontSize: 30.0, color: Colors.white)),
        ],
      ),
      textAlign: TextAlign.center,
    );

    final usernameField = TextField(
      controller: _usernameController,
      obscureText: false,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        hintText: "username",
        hintStyle: TextStyle(fontSize: 20.0, color: Colors.white),
        enabledBorder:
          OutlineInputBorder(borderRadius: BorderRadius.circular(32.0),
            borderSide: BorderSide(color: Colors.white)
          )
      ),
    );

    final passwordField = TextField(
      controller: _passwordController,
      obscureText: true,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        hintText: "Password",
        hintStyle: TextStyle(fontSize: 20.0, color: Colors.white),
        enabledBorder:
          OutlineInputBorder(borderRadius: BorderRadius.circular(32.0), 
            borderSide: BorderSide(color: Colors.white)
          )
      ),
    );

    Future<void> _invalidLogin() async {
      return showDialog<void>(
        context: context,
        barrierDismissible: false, // user must tap button!
        builder: (BuildContext context) {
          return AlertDialog(
            content: Text("Invalid Login"),
            actions: <Widget>[
              FlatButton(
              child: Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
                },
              ),
            ]
          );
        },
      );
    }

    final loginButton = Material(
      elevation: 5.0,
      borderRadius: BorderRadius.circular(30.0),
      color: Color(0xFFB71C1C),
      child: MaterialButton(
        minWidth: MediaQuery.of(context).size.width,
        padding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        onPressed: () async {
          GetYoGirlAGiftClient client = new GetYoGirlAGiftClient(baseAddress);
          String token = await client.getToken();
          User user = await client.login(token, _usernameController.text, _passwordController.text);
          if (user == null)
          {
            print("Invalid login");
            _invalidLogin();
          }
          else
          {
            print("Login Success");
            Data data = new Data(user, client, token);
            Navigator.push(
            context,
            MaterialPageRoute(
            builder: (context) => UserScreen(data: data)));
          }
        },
        child: Text("Login",
          textAlign: TextAlign.center,
          style: TextStyle(
            color: Colors.white, fontWeight: FontWeight.bold)
        ),
      )
    );

    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.pushNamed(context, '/profile');
        },
        backgroundColor: Colors.red,
        label: Text('Profile'),
      ),
      resizeToAvoidBottomPadding: true,
      body: Center(
        child: Container(
          color: Colors.black,
          child: Padding(
            padding: const EdgeInsets.all(36.0),
            child: ListView(
              children: <Widget>[
                SizedBox(height: 10.0),
                titleText,
                SizedBox(height: 35.0),
                SizedBox(
                  height: 100.0,
                  child: Image.asset(
                    "images/logo.png",
                    fit: BoxFit.contain,
                  ),
                ),
                SizedBox(height: 45.0),
                usernameField,
                SizedBox(height: 25.0),
                passwordField,
                SizedBox(
                  height: 35.0,
                ),
                loginButton,
                SizedBox(
                  height: 15.0,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}