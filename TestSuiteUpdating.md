# Introduction #

This guide will walk you through all the steps required to update the test suite with the latest revisions from the W3C. You will need to have WGet, Ant, a Java compiler, and a Java runtime installed in order to accomplish this.

# Prerequisites #
Below are directions for setting up your computer so that you can perform the necessary operations to acquire the test suite.

## WGet ##
You can obtain WGet from the following [page](http://gnuwin32.sourceforge.net/packages/wget.htm). Once you've obtained a binary of WGet, copy the /bin/ directory to where ever you wish to install the program. Remember to add this directory to your Path environmental variable.

## Ant ##
To install a copy of Apache Ant, grab the latest binary distribution from [here](http://ant.apache.org/bindownload.cgi). You can either copy the directory, or run the install script. Remember to add the /bin/ directory to your Path environmental variable.

## Java Compiler and Runtime ##
Download a [JDK](http://java.sun.com/javase/downloads/index.jsp), preferably the SE version, and run the installer. This is a straight forward process and should be trouble free. Once installed remember to add the path of the javac.exe and java.exe executables to your Path environmental variable.

## Setting Environmental Variables ##
In order to make executing commands easier the next few steps will show you how to update the Path environmental variable so you don't need to use full paths to the executables.

1. On the desktop, right click My Computer and select Properties.

2. Select the Advanced tab.

3. Click Environmental Variables.

4. Under System Variables you should see an entry for Path, select this and click edit. Be extremely careful not to delete the current values or you may irreversibly break your operating system.

5. On the very end of the current value add a semicolon followed by the full path to the directory containing the executable you wish to run.

6. Save by clicking OK and exit the menus.
You should now be able to execute the program you just added by simply typing its name at the command prompt. When you're finished you should have a path something like the following:
```
%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;C:\Program Files\IBM\Personal Communications\;C:\Program Files\IBM\Trace Facility\;C:\Program Files\GnuWin32\bin;C:\Program Files\apache-ant-1.7.1\bin;C:\Program Files\Java\jdk1.6.0_13\bin
```

## Test Your Setup ##
To check that you've properly configured everything open a command prompt and type the commands shown. You should receive similar output.
```
Microsoft Windows XP [Version 5.1.2600]
(C) Copyright 1985-2001 Microsoft Corp.

c:\>wget --version
SYSTEM_WGETRC = c:/progra~1/wget/etc/wgetrc
syswgetrc = C:\Program Files\GnuWin32/etc/wgetrc
GNU Wget 1.11.4


Copyright (C) 2008 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later
<http://www.gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.


Originally written by Hrvoje Niksic <hniksic@xemacs.org>.
Currently maintained by Micah Cowan <micah@cowan.name>.


c:\>ant -version
Unable to locate tools.jar. Expected to find it in C:\Program Files\Java\jre6\li
b\tools.jar
Apache Ant version 1.7.1 compiled on June 27 2008
c:\>javac -version
javac 1.6.0_13
```
You need not worry if Ant gives you the above error, it will not effect performance. However if you receive an error such as:
```
c:\>wget --version
'wget' is not recognized as an internal or external command,
operable program or batch file.
```
This means you have either not set your Path environmental variable correctly, or incorrectly installed the executable.

# Obtaining The Most Recent Test Suite #
The current version of the test suite can be downloaded directly from [the W3C website](http://www.w3.org/MarkUp/Forms/Test/). Click on the version of the tests you wish to acquire, and then copy the URL. Remove "/driverPages/html/" from the URL and you should be left with a link to directory containing all the test forms resembling:
```
http://www.w3.org/MarkUp/Forms/Test/XForms1.1/Edition1/
```
With your URL in hand, open a command prompt and execute the following command on your own URL:
```
wget --accept=xhtml --no-parent --wait 2 --recursive --no-host-directories --cut-dirs=4 --exclude-directories=MarkUp/Forms/Test/XForms1.1/Edition1/driverPages/,MarkUp/Forms/Test/XForms1.1/Edition1/zip/ http://www.w3.org/MarkUp/Forms/Test/XForms1.1/Edition1/
```
Please note that the --wait parameter is the number of seconds between requests. It is used primarily so as not to DoS attack the w3.org server. While it substantially slows the processing of the job, please be courteous and include a delay.

After the command has executed you will be left with a directory labelled /EditionX/ and a file labelled robots.txt in whatever directory you executed the command. This will be C:\ unless you navigated somewhere else. Delete robots.txt.

# Transforming The Test Suite #
As is, the test suite does not load Ubiquity. In order to solve this issue you must run the XSLT [ubiquityxforms.xsl](http://code.google.com/p/ubiquity-xforms/source/browse/trunk/testsuite/W3C-XForms-1.1/test-suite-update-scripts/ubiquityxforms.xsl) across all the test files. In order to do this, use Ant with the [build.xml](http://code.google.com/p/ubiquity-xforms/source/browse/trunk/testsuite/W3C-XForms-1.1/test-suite-update-scripts/build.xml) file. Follow the below steps to preform the necessary changes.

1. Place the build.xml and ubiquityxforms.xsl in the same directory as your /EditionX/ folder.

2. Open a command prompt and change your directory to the same as above.

3. Type "ant" to execute the build file.

With that complete it's time to do some post processing. The main goal here is to convert the absolute URL to the Ubiquity loader to a relative path, and also to remove the xhtml namespace. To do this you will need a copy of [RecursiveStringReplacer.java](http://code.google.com/p/ubiquity-xforms/source/browse/trunk/testsuite/W3C-XForms-1.1/test-suite-update-scripts/RecursiveStringReplacer.java). This application takes up to 5 arguments in the following order:

1. An operation to perform; either "xmlns" or "replace".

2. A directory to search for XHTML files, relative to the current path or absolute.

Only necessary if performing replace:

3. A string to search for within every XHTML file.

4. A string to replace the previous string with.

Only necessary if creating a relative URI:

5. A string to prefix the replacement string with for each sub directory.

First you will need to compile the application. Place the .java file in the same parent directory as /EditionX/, navigate your command prompt to this directory as well, and then run the following command:
```
javac RecursiveStringReplacer.java
```
To change the absolute path to a relative URL execute this command, substituting your EditionX for Edition1 if different:
```
java RecursiveStringReplacer replace Edition1 "http://ubiquity-xforms.googlecode.com/trunk/ubiquity-loader.js" "../../../src/ubiquity-loader.js" "../"
```
Be patient as there are nearly 400 files to search and replace on. Then run:
```
java RecursiveStringReplacer xmlns Edition1
```
This will add the default namespace to any instance tags that have no namespace declaration.

And that's it! You should now have a fully converted, up to date copy of the XForms test suite.

# Batch File #

In order to simplify this process a batch file has been created which will execute all necessary commands in the required order. The script assumes you have correctly setup your environment as described above and that the contents of [test-suite-update-scripts](http://code.google.com/p/ubiquity-xforms/source/browse/trunk/testsuite/W3C-XForms-1.1/test-suite-update-scripts/) are all in the same directory. If these requirements are met then generating a new copy of the test suite is as simple as double clicking [transform.bat](http://code.google.com/p/ubiquity-xforms/source/browse/trunk/testsuite/W3C-XForms-1.1/test-suite-update-scripts/transform.bat). You should see a command prompt or two appear, feel free to minimize them, but do not close them. After approximately an hour and a half you should have a complete copy of all the test files in the same directory as transform.bat.

Please note: the batch files are coded to download edition 1 of the XForms 1.1 test suite. If you require a different revision you must edit the the file with a text editor in order to replace the relevant values.