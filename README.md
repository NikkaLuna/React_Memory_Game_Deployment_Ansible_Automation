# React Memory Game Deployment with Ansible Automation

## Project Overview

In this project, I set up and deployed a React application using Ansible. The application is a popular online memory game that aims to level up one's memory.

With Ansible, I was able to eliminate repetitive manual steps like setting up server configurations, installing dependencies, and deploying code. This not only saves a significant amount of time but also ensures consistent and error-free deployments across different environments.

Ansible is an open-source IT automation tool that helps automate tasks such as configuration management, application deployment, and orchestration. It is widely used for managing complex IT environments and ensuring consistency across systems.


## Game Description

At the start, each card in a three-by-four grid shows the same icon. Players flip cards to find matching pairs. If cards don't match, they flip back, and the Turns counter increments by 1. To win, find all pairs within 15 turns. The "New Game" button reshuffles the cards and resets the Turns counter to 0.



<p align="center">
  <img src="GamePicture.png" alt="Front End" style="width:500px;">
</p>




## Project Tasks

### 1. Setting Up Ansible Inventory

Ansible relies on an inventory to match a pattern specified in the playbooks. The `/etc/ansible/hosts` file is the default location for the inventory. Open the `/usercode/ansible/hosts` file and add a webserver with the address `0.0.0.0`.

### 2. Creating the Ansible Playbook

Create a file named `playbook.yml` in the `/usercode/ansible` directory. This playbook will include multiple tasks to automate the deployment process.

### 3. Playbook Tasks

- **Install Aptitude**
- **Install curl and wget**
- **Install Required System Packages**
- **Install NodeJS**
- **Build and Run the Application**

### Playbook Example

```yaml
---
- hosts: all
  connection: local
  become: yes
  tasks:
    - name: Install aptitude
      apt:
        name: aptitude
        state: latest
        update_cache: yes
    - name: Install curl
      apt:
        name: curl
        state: present
    - name: Install wget
      apt:
        name: wget
        state: present
    - name: Install required system packages
      apt:
        pkg:
          - apt-transport-https
          - ca-certificates
          - software-properties-common
          - python3-pip
          - virtualenv
          - python3-setuptools
        state: latest
        update_cache: true
    - name: "Add nodejs 16.x ppa for apt repo"
      shell: curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
    - name: "install node"
      shell: apt-get install -y nodejs
    - name: build app
      shell: cd /usercode/memory_game/ && npm install
    - name: run app
      shell: cd /usercode/memory_game/ && npm start
