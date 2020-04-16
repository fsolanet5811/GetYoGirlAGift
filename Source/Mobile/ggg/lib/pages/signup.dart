import 'package:flutter/material.dart';

class SignUp extends StatefulWidget {
  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: <Widget>[
            Text('LOGIN'),
            FlatButton.icon(
                onPressed: () {
                  Navigator.pushNamed(context, '/girlslist');
                },
                icon: Icon(Icons.arrow_forward),
                label: Text(
                    'Girls List'
                )
            ),
            FlatButton.icon(
                onPressed: () {
                  Navigator.pushNamed(context, '/login');
                },
                icon: Icon(Icons.arrow_forward),
                label: Text(
                    'Login'
                )
            )
          ],
        ),
      ),
    );
  }
}
