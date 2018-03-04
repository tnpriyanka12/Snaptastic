User.destroy_all
u1 = User.create name:"user1", email:"user1@gmail.com", password:"chicken", profile_pic:"https://fillmurray.com/100/100"
u2 = User.create name:"user2", email:"user2@gmail.com", password:"chicken", profile_pic:"https://fillmurray.com/100/100"
u3 = User.create name:"user3", email:"user3@gmail.com", password:"chicken", profile_pic:"https://fillmurray.com/200/200"
u4 = User.create name:"user4", email:"user4@gmail.com", password:"chicken", profile_pic:"https://fillmurray.com/100/100"
puts "Number of Users: #{User.all.length}"


#
Snap.destroy_all
s1 = Snap.create snap:"https://fillmurray.com/320/240", snap_name: "mysnap11"
s2 = Snap.create snap:"https://fillmurray.com/320/240", snap_name: "mysnap21"
s3 = Snap.create snap:"https://fillmurray.com/100/240", snap_name: "mysnap12"
s4 = Snap.create snap:"https://fillmurray.com/320/100", snap_name: "mysnap22"
s5 = Snap.create snap:"https://fillmurray.com/100/100", snap_name: "mysnap31"
s6 = Snap.create snap:"https://fillmurray.com/100/100", snap_name: "mysnap41"
puts "Number of Snaps: #{Snap.all.length}"


u1.snaps << s1 << s3
u2.snaps << s2 << s4
u3.snaps << s5
u4.snaps << s6
