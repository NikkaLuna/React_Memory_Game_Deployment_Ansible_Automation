# React Memory Game Deployment with Ansible Automation

## Project Overview

In this project, I set up and deployed a React application using Ansible. The application is a popular online memory game that aims to level up one's memory.

With Ansible, I was able to eliminate repetitive manual steps like setting up server configurations, installing dependencies, and deploying code. This not only saves time but also ensures consistent and error-free deployments across different environments.

## Introduction

Ansible is an open-source IT automation tool that helps automate tasks such as configuration management, application deployment, and orchestration. It is widely used for managing complex IT environments and ensuring consistency across systems.

## Game Description

At the start, each card in a three-by-four grid shows the same icon. Players flip cards to find matching pairs. If cards don't match, they flip back, and the Turns counter increments by 1. To win, find all pairs within 15 turns. The "New Game" button reshuffles the cards and resets the Turns counter to 0.


<p align="center">
  <img src="GamePicture.png" alt="Front End" style="width:400px;">
</p>

*Screenshot displaying the front-end interface of the application.*

## Prerequisites

- Ansible installed on your local machine.
- NodeJS and npm installed on your local machine.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/React_Memory_Game_Deployment_Ansible_Automation.git
    cd React_Memory_Game_Deployment_Ansible_Automation
    ```

2. Navigate to the Ansible directory:
    ```bash
    cd ansible
    ```

3. Add the webserver to the inventory:
    ```bash
    echo "webserver ansible_host=0.0.0.0" >> hosts
    ```

## Creating the Ansible Playbook

Create a file named `playbook.yml` in the `ansible` directory. This playbook will include multiple tasks to automate the deployment process.

## Playbook Tasks

1. Install Aptitude
2. Install curl and wget
3. Install Required System Packages
4. Install NodeJS
5. Build and Run the Application

## Playbook Example

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

