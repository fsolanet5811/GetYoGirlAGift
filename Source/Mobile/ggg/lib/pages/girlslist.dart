import 'package:flutter/material.dart';

class GirlsList extends StatefulWidget {
  @override
  _GirlsListState createState() => _GirlsListState();
}

class _GirlsListState extends State<GirlsList> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: <Widget>[
            Text('LIST OF GIRLS'),
            FlatButton.icon(
                onPressed: () {
                  Navigator.pushNamed(context, '/profile');
                },
                icon: Icon(Icons.arrow_forward),
                label: Text(
                    'Profile'
                )
            ),
          ],
        ),
      ),
    );
  }
}

