const path = require('path'),
    app = require(path.resolve(__dirname, '../../server/server')),
    ds = app.datasources.sutoreji;

module.exports = (disconnect) => {
    const MigrateAdmins = () => {
        return new Promise(function(resolve, reject) {
            app.models.Role.create({
                name:'admin'
            }, function(err, role) {
                if (err) {
                    reject(err);
                }
                console.log('Role:', role);
                const adminUsers = [
                    {username: 'rm', email: 'rm@rm.com', password: '123'},
                    {username: 'lucho', email: 'lucho@lucho.com', password: '123'}
                ];
                var count = adminUsers.length;
                adminUsers.forEach(function(user) {
                    app.models.AppUser.create(user, function(err, model) {
                        if (err) {
                            reject(err);
                        }
                        console.log('Created:', model);
                        //make an admin
                        role.principals.create({
                            principalType: app.models.RoleMapping.USER,
                            principalId: model.id
                        }, function(err, principal) {
                            if (err) {
                                reject(err);
                            }
                            console.log('Created principal:', principal);
                        });

                        --count;
                        if(count === 0) {
                            resolve(true);
                        }
                    });
                });
            });
        });
    },
    MigrateUsers = () => {
        return new Promise(function(resolve, reject) {
            const users = [{username: 'user', email: 'user@user.com', password: 'opensesame'}];
            var count = users.length;

            users.forEach(function(user) {
                app.models.AppUser.create(user, function(err, model) {
                    if (err) {
                        reject(err);
                    }
                    console.log('Created:', model);
                    count--;
                    if(count === 0) {
                        resolve(true);
                    }
                });
            });
        });
    },
    ClearModels = () => {
        return new Promise(function(resolve, reject) {
            app.models.Role.destroyAll([], function(err, info) {
                if (err) {
                    reject(err);
                }

                app.models.AppUser.destroyAll([], function(err, info) {
                    if (err) {
                        reject(err);
                    }

                    resolve(true);
                });
            });
        });
    };

    return new Promise(function(resolve, reject) {
        ds.automigrate('AppUser', function(err) {
            if (err) {
                reject(err);
            }
            
            ClearModels().then(function(done) {
                MigrateUsers().then(function(done) {
                    console.log('USERS MIGRATED');
                    MigrateAdmins().then(function(done) {
                        if(disconnect) {
                            ds.disconnect();
                        } else {
                            resolve();
                        }
                    }, function(err) {
                        if (err) {
                            reject(err);
                        }
                    });
                }, function(err) {
                    if (err) {
                        reject(err);
                    }
                });
            });
        });
    });
}