var
  inquirer = require("inquirer"),
  fs = require('fs'),
  path = require('path'),
  gfile = require('gfilesync'),
  yaml = require('js-yaml');

module.exports = {
  do: function(data, callback) {

    var version = '0.7.1';

    var dependenciesChoices = [
      {
        name: "Test - Dropwizard - Testing",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-testing",
          version: version,
          scope: "test"
        },
        checked: true
      },
      {
        name: "Dropwizard - Core",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-testing",
          version: version
        },
        checked: true
      },
      {
        name: "Dropwizard - Client",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-client",
          version: version
        }
      },
      {
        name: "Dropwizard - Validation",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-validation",
          version: version
        }
      },
      {
        name: "Dropwizard - Logging",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-logging",
          version: version
        }
      },
      {
        name: "Dropwizard - JDBI",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-jdbi",
          version: version
        }
      },
      {
        name: "Dropwizard - Metrics",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-metrics",
          version: version
        }
      },
      {
        name: "Dropwizard - Jsckson",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-jackson",
          version: version
        }
      },
      {
        name: "Dropwizard - Authentication",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-authentication",
          version: version
        }
      },
      {
        name: "Dropwizard - Configuration",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-configuration",
          version: version
        }
      },
      {
        name: "Dropwizard - Database",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-db",
          version: version
        }
      },
      {
        name: "Dropwizard - Asset",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-assets",
          version: version
        }
      },
      {
        name: "Dropwizard - Views",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-views",
          version: version
        }
      },
      {
        name: "Dropwizard - Views - Freemarker",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-views-freemarker",
          version: version
        }
      },
      {
        name: "Dropwizard - Views - Mustache",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-views-mustache",
          version: version
        }
      },
      {
        name: "Dropwizard - Hibernate",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-hibernate",
          version: version
        }
      },
      {
        name: "Dropwizard - Utility classes",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-util",
          version: version
        }
      },
      {
        name: "Dropwizard - Jersey",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-jersey",
          version: version
        }
      },
      {
        name: "Dropwizard - Jetty",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-jetty",
          version: version
        }
      },
      {
        name: "Dropwizard - Lifecycle",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-lifecycle",
          version: version
        }
      },
      {
        name: "Dropwizard - Migrations",
        value: {
          groupId: "io.dropwizard",
          artifactId: "dropwizard-migrations",
          version: version
        }
      }
    ];

    var questions = [
      {
        type: 'list',
        name: 'javaVersion',
        message: 'Which Java version ?',
        choices: [{
          name: '1.8',
          value: '1.8'
        },{
          name: '1.7',
          value: '1.7'
        },{
          name: '1.6',
          value: '1.6'
        },{
          name: '1.5',
          value: '1.5'
        }],
        default: '1.8'
      },
      {
        type: 'list',
        name: 'packaging',
        message: 'Which packaging ?',
        choices: [{
          name: 'Jar',
          value: 'jar'
        },{
          name: 'War',
          value: 'war'
        }],
        default: 'war'
      },
      {
        type: 'checkbox',
        name: 'dependenciesSelected',
        message: 'Which dependencies ?',
        choices: dependenciesChoices
      }
    ];
    inquirer.prompt(questions, function( answers ) {
      /*
      if(answers.buildTool == 'maven') {
        gfile.copy(
          path.join(__dirname,'../model/config.@maven.yml'),
          path.join(process.cwd(),'model/config.@maven.yml'));
      }
      if(answers.buildTool == 'gradle') {
        gfile.copy(
          path.join(__dirname,'../model/config.@gradle.yml'),
          path.join(process.cwd(),'model/config.@gradle.yml'));
      }
      */

      var data = gfile.loadYaml(path.join(process.cwd(),'Genjsfile.yml'));

      if(data.global == null) {
        data.global = {};
      }
      if(data.global.project == null) {
        data.global.project = {};
      }
      if(data.global.project.name == null) {
        data.global.project.name = 'myapp';
      }
      if(data.global.project.version == null) {
        data.global.project.version = '0.1';
      }
      if(data.global.project.description == null) {
        data.global.project.description = '';
      }

      if(data.global.maven == null) {
        data.global.maven = {};
      }
      if(data.global.maven.groupId == null) {
        data.global.maven.groupId = 'demo';
      }
      if(data.global.maven.artifactId == null) {
        data.global.maven.artifactId = 'myapp';
      }
      if(data.global.maven.packaging == null) {
        data.global.maven.packaging = answers.packaging;
      }

      if(data.global.version == null) {
        data.global.version = {};
      }
      data.global.version.springboot = '1.2.2';
      if(data.global.version.java == null) {
        data.global.version.java = answers.javaVersion;
      }
      
      if(data.global.build == null) {
        data.global.build = {};
      }
      data.global.build.tool = 'maven';

      gfile.writeYaml(path.join(process.cwd(),'Genjsfile.yml'), data);

      var data = {
        dependencies: answers.dependenciesSelected
      };

      gfile.writeYaml(path.join(process.cwd(),'model','config.@build.yml'), data);

      if(callback) {
        callback();
      }
    });
  }
};
