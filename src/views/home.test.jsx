import React from "react";
import { render, getAllByText,screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./home";
import '@testing-library/jest-dom';

describe('Home component', () => {
  it('should render the navbar', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeInTheDocument();
  });

  it('should render the correct links', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const aboutLinks = screen.getAllByRole('link', { name: /about/i });
    aboutLinks.forEach((aboutLink) => {
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    const competitionsLinks = screen.getAllByRole('link', { name: /competitions/i });
    competitionsLinks.forEach((competitionsLink) => {
      expect(competitionsLink).toHaveAttribute('href', '/competitions');
    });

    
    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    homeLinks.forEach((homeLink) => {
      expect(homeLink).toHaveAttribute('href', '/');
    });


    const contactLinks = screen.getAllByRole('link', { name: /contact/i });
    contactLinks.forEach((contactLink) => {
      expect(contactLink).toHaveAttribute('href', '/contact');
    });
  });

  it('should render the login button', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const loginButton = screen.getByText(/LOGIN/i);
    expect(loginButton).toBeInTheDocument();
  });

  it('should render the hero section', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const heroElement = screen.getByTestId('hero');
  expect(heroElement).toBeInTheDocument();
  });

  it('should render the correct hero text', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const heroTextElement = screen.getByText(
      /Where Programmers Rise, Challenges Fall!/i
    );
    expect(heroTextElement).toBeInTheDocument();
  });

  it('should render the particle component', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const particleComponent = screen.getByTestId('particle-component');
    expect(particleComponent).toBeInTheDocument();
  });

  it('should have a link to the login page', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('should have a link to the competitions page', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const competitionsLinks = screen.getAllByRole('link', { name: /competitions/i });
    competitionsLinks.forEach((competitionsLink) => {
      expect(competitionsLink).toHaveAttribute('href', '/competitions');
    });
  });

  it('should have a link to the contact page', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const contactLinks = screen.getAllByRole('link', { name: /contact/i });
    contactLinks.forEach((contactLink) => {
      expect(contactLink).toHaveAttribute('href', '/contact');
    });

    
  });

  it('should have a link to the about page', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const aboutLinks = screen.getAllByRole('link', { name: /about/i });
    expect(aboutLinks.length).toBe(2);
    expect(aboutLinks[0]).toHaveAttribute('href', '/about');
  });

  test('displays all navigation links', () => {
    render(<Router>
      <Home />
    </Router>);


    const aboutLinks = screen.getAllByRole('link', { name: /about/i });
    aboutLinks.forEach((aboutLink) => {
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    const competitionsLinks = screen.getAllByRole('link', { name: /competitions/i });
    competitionsLinks.forEach((competitionsLink) => {
      expect(competitionsLink).toHaveAttribute('href', '/competitions');
    });

    
    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    homeLinks.forEach((homeLink) => {
      expect(homeLink).toHaveAttribute('href', '/');
    });


    const contactLinks = screen.getAllByRole('link', { name: /contact/i });
    contactLinks.forEach((contactLink) => {
      expect(contactLink).toHaveAttribute('href', '/contact');
    });


  });




});