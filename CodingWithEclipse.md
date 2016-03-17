# Overview #

Please see the [Coding Guidelines](http://code.google.com/p/ubiquity-xforms/wiki/CodingGuidelines) and in particular the [development process for the Ubiquity project as a whole](http://code.google.com/p/ubiquity/wiki/CodingUsingSvn), which contains both an overview and detailed explanation of the development process as well as SVN command-line instructions.

This page provides the corresponding mechanics for using Eclipse and the Subversive plugin, rather than the command-line, to achieve the development process above.

Contributors have the option of working on the trunk code, but as mentioned all over the place **do not commit** without a code review.

The mechanics below assume you have SVN commit access.  The instructions are similar if you don't have commit access.  You can get the trunk using an http request, rather than https.  Then, once you use "Create Patch", you can email that to the contributor mailing list for a code review.

The mechanics below describe how to work without using a branch.  The process is similar when you do have a branch.  The main difference is that you have to update your branch with the trunk before asking for a code review (rather than updating your local trunk copy before asking for a code review).

Finally, at the end of this page, there are some instructions on setting up Subversive in Eclipse for use in the Ubiquity XForms project.

# Contribution Mechanics (without branching) #

  1. **When you want to make changes, work on trunk but DO NOT COMMIT**
    * To add a file, use Team | Add to Version Control... to add the file LOCALLY
    * To undo local changes to a file and go back to the server copy, use Team | Revert...
  1. **When you want a code review, you need to make a copy of your changes onto a copy of the trunk.**
    1. Copy the trunk to a directory in your changes location
      1. Go to SVN Repositories perspective
      1. Right Click on the trunk, choose Refactor | Copy To...
      1. Open the changes directory and click the subdirectory with your gmail name
      1. Rename the copy using a name associated with the feature your changes implement. For reference below, let the name be **FEATURE-X**
      1. Comment should just say that you are creating a copy to patch and review.
    1. Get your new copy into your project workspace
      1. Go back to Java Perspective and Right click Package Explorer
      1. New | Project
      1. SVN | Projects from SVN | Next >>
      1. The URL/user name/password dialog should be skipped this time
      1. Next View is "Select Resource"
        * Choose your new trunk copy named e.g. FEATURE-X from your changes directory
      1. Next View is "Check out as".  Click Finish
        * This accepts "Check out... Using New Project Wizard", recursive checkout, no ignore
      1. The "Select a wizard" dialog comes up
        1. Choose General | Project and hit next
        1. Project Name ux-FEATURE-X
        1. Use default location and Click Finish
  1. **Apply your trunk changes to your ux-FEATURE-X copy**
    1. Right click the ubiquity-xforms trunk project
    1. Team | Create Patch ...
    1. Hit Finish (accepts putting patch on the clipboard)
      * Note that changes to true binary files must be handled **manually** because the patch system only handles text
      * Note that .xhtml files are of type application/xhtml+xml, which is being treated as binary by SVN.  However, if the only binary files that were modified are really text files, it may be possible to patch them automatically by hitting Next instead of Finish in this step, and then selecting the "Process Binary Resources" checkbox
    1. Right click the ux-FEATURE-X project
    1. Team | Apply Patch ...
    1. Hit Finish (pulls from clipboard)
    1. Right click the ux-FEATURE-X project
    1. Team | Commit
    1. Add a comment that begins **FOR REVIEW** and explain feature
    1. After commit, you will be able to see a page for your revision
      * Go to ubiquity project and click the [sources tab](http://code.google.com/p/ubiquity-xforms/source/checkout)
      * Click the changes link, and at or near the top should be your revision (`http://code.google.com/p/ubiquity-xforms/source/detail?r=NNNN`)
      * The modifications can be viewed by expanding the trees OR to get a side-by-side diff comparison, don't click "Diff"! Instead, click the file link, then click "Diff" at the top right corner
    1. Do a non-rated review of your code.  In the general comments, put **CODE REVIEW NEEDED** and add any line-by-line comments that may be needed to help reviewers understand your code.
      * This will send an email to the ubiquity-xforms-eng@googlegroups.com with a subject that includes your **rNNNN** and a body that includes CODE REVIEW NEEDED, which can be used to filter emails.
      * The typical review period is 48 hours. If you need a shorter review period, send an email to ubiquity-xforms-eng@googlegroups.com with **URGENT** in the subject line and ask for quick reviews and also ask people to indicate if they don't intend to review (since you can't get a -1 from someone who doesn't review)
    1. At least one +1 review is needed before committing to trunk
      * A review can be +1 and can still request minor editorial changes needing no further review or identify issues that should be raised in the issue system once the code is committed.
      * A -1 review halts the commit until the reason for the -1 is resolved.  A -1 review requires a detailed technical justification, including what if anything can be done to mitigate or eliminate the concerns raised in the review.
      * A neutral review can be used to raise issues without advancing or impeding a trunk commit.
      * Ping list again if no +1 or -1 reviews within 48 hours
      * A +1, no -1's, and 48 hours are sufficient for a trunk commit
      * For URGENT requests, if a +1 is received, then ping the list to ask for a same day response to whether anyone else is planning a review.  If no response that day, then assume no further reviews are coming, and proceed with commit to trunk due to +1 received.
      * Except for addressing minor editorial changes, a substantive change should spawn a new review copy by repeating the above process, in which case the current review copy should be deleted without committing to trunk.
  1. **Committing changes to the trunk and deleting the review copy**
    1. Ensure you have the favorable review(s) needed
    1. Right click the trunk project and use Team | Update first
    1. Right click the trunk project and use Team | Commit...
    1. Delete ux-FEATURE-X project from the package explorer
    1. Go to SVN Repositories perspective
    1. Right-click changes/ux-FEATURE-X folder and choose Delete

# Setting up Subversive for use in Ubiquity XForms #

  1. **Install Subversive plugin**
    1. Either navigate to http://www.eclipse.org/subversive, click "Downloads" on left panel, click link to install instructions,
    1. Or follow instructions below.
    1. In Eclipse, choose menu Help | Software Updates
    1. Click Available Software tab
    1. Must install Subversive plugin
      * It's under the Ganymede Update Site (http://download.eclipse.org/release/ganymede)
      * Then, open up the Collaboration Tools
      * Choose the checkbox for Subversive SVN Team Provider (choose the incubation 0.7.3 release)
    1. Before proceeding to install, must also install Subversive Connectors (incubation) as follows (all three do seem to need to be installed at the same time)
      * Click "Add Site..."
      * Add the external update site indicated on the Downloads site
        * To find out the update site, click external site link (http://www.polarion.com/products/svn/subversive.php?src=eclipseproject)
        * Or, just use the following update site (the current one) http://www.polarion.org/projects/subversive/download/eclipse/2.0/update-site/
        * Click OK to add the site
      * Back on the Available Software tab,
        * Open the Subversive SVN Connectors subtree
        * Choose the child Subversive SVN Connectors and SVNKit 1.1.7 (the latter is marked optional, but it isn't)
    1. Click Install...
  1. **Environment set up**
    1. Window | Preferences
    1. Go to General | Editors | Text Editors
      * Set "Displayed Tab width: 4" and **uncheck** "Insert spaces for tabs"
    1. Go to Team | SVN | Properties Configuration
    1. On the Automatic Properties tab, click Add button to add each of the following
```
	    Filename template   Properties
	    *.pdf               svn:mime-type=application/pdf
	    *.png               svn:mime-type=image/png
	    *.gif               svn:mime-type=image/gif
	    *.jpg               svn:mime-type=image/jpeg
            *.html              svn:mime-type=text/html
            *.xhtml             svn:mime-type=application/xhtml+xml
            *.css               svn:mime-type=text/css
	    *.js                svn:eol-style=native
	    *.html              svn:eol-style=native
	    *.xhtml             svn:eol-style=native
            *.css               svn:eol-style=native
```
  1. **Obtain a local copy of the project trunk**
    1. You may need to validate the server certificate for **https://ubiquity-xforms.googlecode.com:443**. This can be done from the command line by entering an **svn** command; _svn --username <gmail login> ls https://ubiquity-xforms.googlecode.com/svn/trunk/_ works well. You will be prompted to reject or accept the certificate; select "accept (p)ermanently". You will then be prompted to enter your Google Code password (see below). You should then see a listing like this:
```
    > svn --username <gmail login> ls https://ubiquity-xforms.googlecode.com/svn/trunk/
    Error validating server certificate for 'https://ubiquity-xforms.googlecode.com:443':
     - The certificate is not issued by a trusted authority. Use the
    fingerprint to validate the certificate manually!
    Certificate information:
     - Hostname: googlecode.com
     - Valid: from May 28 15:48:13 2008 GMT until Jun 21 13:09:43 2010 GMT
     - Issuer: Certification Services Division, Thawte Consulting cc, Cape Town, Western Cape, ZA
     - Fingerprint: b1:3a:d5:38:56:27:52:9f:ba:6c:70:1e:a9:ab:4a:1a:8b:da:ff:ec
    (R)eject, accept (t)emporarily or accept (p)ermanently? p
    Authentication realm: <https://ubiquity-xforms.googlecode.com:443> Google Code Subversion Repository
    Password for '<gmail login>': ************
    build/
    samples/
    src/
    testsuite/
    unit-tests/
```
    1. Right-click Package Explorer
    1. New | Project
    1. SVN | Projects from SVN | Next >>
    1. URL: https://ubiquity-xforms.googlecode.com/svn/
    1. User: same as gmail login (boyerj@ca.ibm.com)
    1. Password: Google code password, not gmail login password
      * Log in to the Google Code Project
      * Under source tab, there is a link to get your Google code password
    1. Click Save Password and then Click Next
    1. Next View is "Select Resource".  Choose trunk and click Finish
      * (a branch could be selected here instead)
    1. Next View is "Check out as".  Click Finish
      * This accepts "Check out... Using New Project Wizard", recursive checkout, no ignore
    1. The "Select a wizard" dialog comes up
      1. Choose General | Project and hit next
      1. Project Name **ubiquity-xforms**
      1. Use default location
      1. Click Finish
  1. **Make a "changes" directory for yourself**
    1. Open the SVN Repositories perspective
      * Window | Open Perspectives | Other...
      * SVN Repository Exploring
    1. Now make a code review directory for yourself in changes branch
      * Choose changes branch, then Right click and choose New | Folder
      * Use your gmail address for the folder name